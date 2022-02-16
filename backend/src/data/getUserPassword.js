import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:getUserPassword");
const getUserPassword = (type, user_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT password FROM ?? WHERE ?? = ?",
				[type, type + "_id", user_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						//debug(result);
						resolve({
							success: true,
							message: "Got Password",
							data: { password: result[0].password },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default getUserPassword;
