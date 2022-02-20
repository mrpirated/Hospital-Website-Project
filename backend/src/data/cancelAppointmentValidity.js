import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:cancelAppointmentValidity");
const cancelAppointmentValidity = (type, user_id, appointment_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			var q;
			if (type === "doctor") {
				q =
					"SELECT appointment_id,\
                    start_time,\
                    end_time,\
					state\
                    FROM appointment\
                    WHERE doctor_id = ?\
                    AND appointment_id = ?";
			} else if (type === "patient") {
				q =
					"SELECT a.appointment_id, \
                    a.start_time, \
                    a.end_time,\
					a.state\
                    FROM appointment a \
                    JOIN cases c ON a.case_id=c.case_id \
                    WHERE c.patient_id = ? AND \
                    a.appointment_id = ?";
			} else if (type === "admin") {
				resolve({ success: true });
			}
			connection.query(q, [user_id, appointment_id], (err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else {
					if (result.length > 0) {
						//var dt = new Date();

						if (
							result[0].state === "pending" ||
							new Date(result[0].start_time) > new Date()
						)
							resolve({ success: true });
						else {
							reject({
								success: false,
								message: "Cannot cancel past appointment",
							});
						}
					} else
						reject({
							success: false,
							message: "Appointment Not Associated with the user",
						});
				}
			});
			connection.release();
		});
	});
};

export default cancelAppointmentValidity;
