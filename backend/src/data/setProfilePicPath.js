import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:setProfilePicPath");

const setProfilePicPath = (type, filename, user_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"UPDATE ?? SET profile_pic = ? WHERE doctor_id = ?",
				[type, filename, user_id],
				(err, result) => {
					if (err) reject({ success: false, message: err });
					else
						resolve({
							success: true,
							message: "Profile pic uploaded Successfully",
						});
				}
			);
			connection.release();
		});
	});
};
export default setProfilePicPath;
