import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:getCreatedTime");

const getCreatedTime = (type, user_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT created\
                FROM ?? WHERE ?? = ?",
				[type, type + "_id", user_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						//debug(result);
						if (result.length > 0) {
							resolve({
								success: true,
								message: "Created Time Found",
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
export default getCreatedTime;
