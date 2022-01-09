import connection from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:setAppointmentTime");
import moment from "moment";

const setAppointmentTime = ({ start_time, end_time }, appointment_id) => {
	return new Promise((resolve, reject) => {
		var values = {
			start_time: moment(start_time).format("YYYY-MM-DD HH:mm:ss"),
			end_time: moment(end_time).format("YYYY-MM-DD HH:mm:ss"),
			state: "scheduled",
		};
		connection.query(
			"UPDATE appointment SET ? WHERE appointment_id = ?",
			[values, appointment_id],
			(err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else {
					resolve({
						success: true,
						message: "Appointment set Successfully",
						data: result,
					});
				}
			}
		);
	});
};
export default setAppointmentTime;
