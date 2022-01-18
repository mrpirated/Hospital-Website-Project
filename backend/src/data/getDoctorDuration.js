import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:getDoctorDuration");

const getDoctorDuration = (user_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT appointment_duration FROM doctor WHERE doctor_id=?",
				[user_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						//debug(result);
						resolve({
							success: true,
							message: "Duration Found",
							data: { duration: result[0].appointment_duration },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default getDoctorDuration;
