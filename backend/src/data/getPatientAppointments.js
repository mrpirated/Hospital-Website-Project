import dbg from "debug";
const debug = dbg("data:getPatientAppointments");
import pool from "../dbconn/db";
const getPatientAppointments = (case_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				'SELECT\
				a.appointment_id,\
				a.case_id,\
				a.doctor_id,\
				CONCAT(d.first_name," ", d.last_name) AS doctor_name,\
				s.end_time,\
				s.start_time,\
				a.preferred_date\
		  		FROM\
				appointment a\
				JOIN doctor d ON a.doctor_id = d.doctor_id\
				JOIN slots s ON s.appointment_id = a.appointment_id\
		  		WHERE\
				a.case_id = ?\
		  		ORDER BY\
				s.start_time DESC',
				case_id,
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Appointments Found Successfully",
							data: { appointments: result },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default getPatientAppointments;
