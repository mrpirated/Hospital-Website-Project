import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:setAppointment");
import moment from "moment";
const setAppointment = (case_id, preferred_date, doctor_id, response) => {
	return new Promise((resolve, reject) => {
		var values = {
			case_id: case_id,
			start_time: null,
			end_time: null,
			preferred_date: preferred_date,
			doctor_id: doctor_id,
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
				"INSERT INTO appointment SET ?",
				[values],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						if (response.success) {
							resolve({
								success: true,
								message: "Appointment set successfully",
								data: {
									appointment_time: response.data.appointment_time,
									appointment_id: result.insertId,
								},
							});
						} else {
							resolve({
								success: true,
								message:
									"Doctor is not free right now your appointment is in pending state",
								data: { appointment_id: result.insertId },
							});
						}
					}
				}
			);
			connection.release();
		});
	});
};
export default setAppointment;
