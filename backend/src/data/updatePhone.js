import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:updatePhone");
const updatePhone = (type, phone, user_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"UPDATE ?? SET phone = ? WHERE ??=?",
				[type, phone, type + "_id", user_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else
						resolve({ success: true, message: "Phone updated successfully" });
				}
			);
			connection.release();
		});
	});
};
export default updatePhone;
