import dbg from "debug";
const debug = dbg("data:getPatientCases");
import pool from "../dbconn/db";
const getProfilePicFileName = (type, user_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT profile_pic FROM ?? WHERE ?? = ?",
				[type, type + "_id", user_id],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Name Found Successfully",
							data: { profile_pic: result[0].profile_pic },
						});
					}
				}
			);
		});
	});
};
export default getProfilePicFileName;
