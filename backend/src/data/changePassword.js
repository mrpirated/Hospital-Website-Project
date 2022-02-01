import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:changePassword");

const changePassword = (type, user_id, password) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"UPDATE ?? SET password = ? WHERE ?? = ?",
				[type, password, type + "_id", user_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						debug(result);
						resolve({
							success: true,
							message: "Password Changed Successfully",
						});
					}
				}
			);
		});
	});
};
export default changePassword;
