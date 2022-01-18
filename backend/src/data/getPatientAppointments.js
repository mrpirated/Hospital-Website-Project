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
				a.end_time,\
				a.meeting_link,\
				a.start_time\
		  		FROM\
				appointment a\
				JOIN doctor d ON a.doctor_id = d.doctor_id\
		  		WHERE\
				a.case_id = ?\
		  		ORDER BY\
				start_time DESC',
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
