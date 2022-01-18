import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:setDoctorAppointmentDuration");
const setDoctorAppointmentDuration = (user_id, duration) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"UPDATE doctor SET appointment_duration = ? WHERE doctor_id = ?",
				[duration, user_id],
				(err, result) => {
					if (err) reject({ success: false, message: err });
					else
						resolve({
							success: true,
							message: "Appointment duration set Successfully",
						});
				}
			);
			connection.release();
		});
	});
};
export default setDoctorAppointmentDuration;
