import pool from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:insertNewAppointment");

const insertNewAppointment = (case_id, preferred_date, doctor_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection" });
			}
			var values = {
				case_id: case_id,
				start_time: null,
				end_time: null,
				preferred_date: preferred_date,
				doctor_id: doctor_id,
				state: "pending",
			};
			connection.query(
				"INSERT INTO appointment SET ?",
				[values],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Appointment set successfully",
							data: {
								appointment_id: result.insertId,
							},
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default insertNewAppointment;
