import dbg from "debug";
const debug = dbg("data:getAllPatientAppointments");
import pool from "../dbconn/db";
const getAllPatientAppointments = (user_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				'SELECT\
                a.appointment_id,\
                a.case_id,\
                CONCAT(d.first_name, " ", d.last_name) AS doctor_name,\
                c.case_description,\
                a.start_time,\
                a.end_time,\
                a.preferred_date,\
                a.state\
                FROM\
                appointment a\
                JOIN cases c ON a.case_id = c.case_id\
                JOIN doctor d ON a.doctor_id = d.doctor_id\
                JOIN patient p ON c.patient_id = p.patient_id\
                WHERE\
                c.patient_id = ?\
                ORDER BY\
                a.start_time DESC,a.preferred_date ASC\
                ',
				[user_id],
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
export default getAllPatientAppointments;
