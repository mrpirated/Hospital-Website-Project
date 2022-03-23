import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:setAppointmentSlot");
import moment from "moment";
const setAppointmentSlot = (slot_id, appointment_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"UPDATE slots SET appointment_id = ? WHERE slot_id = ?",
				[appointment_id, slot_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Appointment set successfully",
							// data: {
							// 	appointment_time: response.data.appointment_time,
							// 	appointment_id: result.insertId,
							// },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default setAppointmentSlot;
