import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:cancelAppointment");

const cancelAppointment = (appointment_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"UPDATE appointment\
				SET state = 'cancelled'\
                WHERE appointment_id=?",
				[appointment_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Appointment Cancelled Successfully",
						});
					}
				}
			);
			connection.release();
		});
	});
};

export default cancelAppointment;
