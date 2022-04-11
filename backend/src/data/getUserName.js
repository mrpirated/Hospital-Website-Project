import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:getCreatedTime");

const getUserName = (type, user_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			var initial;
			if (type == "patient") initial = "P";
			else if (type == "doctor") initial = "D";
			else if (type == "admin") initial = "A";
			connection.query(
				"SELECT CONCAT(?,YEAR(created),LPAD(??, 4, '0')) AS username\
                FROM ?? WHERE ?? = ?",
				[initial, type + "_id", type, type + "_id", user_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						//debug(result);
						if (result.length > 0) {
							resolve({
								success: true,
								message: "Username got successfully",
								data: result[0],
							});
						} else reject({ success: false, message: "Not found" });
					}
				}
			);
			connection.release();
		});
	});
};
export default getUserName;
