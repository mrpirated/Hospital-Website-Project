import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:verifyEmail");
const verifyEmail = (type, user_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"UPDATE ?? SET email_verified = TRUE WHERE ?? = ?",
				[type, type + "_id", user_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else
						resolve({ success: true, message: "Email Verified Successfully" });
				}
			);
			connection.release();
		});
	});
};
export default verifyEmail;
