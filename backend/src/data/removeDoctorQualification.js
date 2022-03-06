import pool from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:removeDoctorQualification");
const removeDoctorQualification = (user_id, qualification_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection" });
			}
			connection.query(
				"DELETE FROM doctor_qualification WHERE qualification_id = ? AND doctor_id = ?",
				[qualification_id, user_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Qualification removed successfully",
						});
					}
				}
			);
		});
	});
};
export default removeDoctorQualification;
