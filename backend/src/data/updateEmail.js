import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:updateEmail");

const updateEmail = (type, user_id, email) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"UPDATE ?? SET email = ? WHERE ?? = ?",
				[type, email, type + "_id", user_id],
				(err, result) => {
					if (err) reject({ success: false, message: err });
					else
						resolve({
							success: true,
							message: "Email Updated Successfully",
						});
				}
			);
			connection.release();
		});
	});
};
export default updateEmail;
