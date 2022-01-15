import connection from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:setDoctorAppointmentDuration");
const setDoctorAppointmentDuration = (user_id, duration) => {
	return new Promise((resolve, reject) => {
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
	});
};
export default setDoctorAppointmentDuration;
