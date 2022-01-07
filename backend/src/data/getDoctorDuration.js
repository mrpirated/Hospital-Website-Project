import connection from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:getDoctorDuration");

const getDoctorDuration = (user_id) => {
	return new Promise((resolve, reject) => {
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
	});
};
export default getDoctorDuration;
