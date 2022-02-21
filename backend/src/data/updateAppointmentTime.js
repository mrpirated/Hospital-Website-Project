import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:updateAppointmentTime");
import moment from "moment";
const updateAppointmentTime = (appointment_id, response) => {
	return new Promise((resolve, reject) => {
		var values = {
			start_time: null,
			end_time: null,
			state: "pending",
		};
		if (response.success) {
			values.start_time = moment(
				response.data.appointment_time.start_time
			).format("YYYY-MM-DD HH:mm:ss");
			values.end_time = moment(response.data.appointment_time.end_time).format(
				"YYYY-MM-DD HH:mm:ss"
			);
			values.state = "scheduled";
		}
		//debug(values);
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"UPDATE appointment SET ? WHERE appointment_id = ? ",
				[values, appointment_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						if (response.success) {
							resolve({
								success: true,
								message: "Appointment set successfully",
								data: { appointment_time: response.data.appointment_time },
							});
						} else {
							resolve({
								success: true,
								message:
									"Doctor is not free right now your appointment is in pending state",
							});
						}
					}
				}
			);
			connection.release();
		});
	});
};
export default updateAppointmentTime;
