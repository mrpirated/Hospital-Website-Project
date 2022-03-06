import pool from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:removeDoctorSpecialization");
const removeDoctorSpecialization = (user_id, specialization_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection" });
			}
			connection.query(
				"DELETE FROM doctor_specialization WHERE specialization_id = ? AND doctor_id = ?",
				[specialization_id, user_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Specialization removed successfully",
						});
					}
				}
			);
		});
	});
};
export default removeDoctorSpecialization;
