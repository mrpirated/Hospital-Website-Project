import dbg from "debug";
const debug = dbg("data:getAppointmentUsers");
import pool from "../dbconn/db";

const getAppointmentUsers = (appointment_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				'SELECT\
                CONCAT(p.first_name, " ", p.last_name) AS patient_name,\
                CONCAT(d.first_name, " ", d.last_name) AS doctor_name,\
                d.doctor_id,\
                p.patient_id,\
                c.case_description,\
                a.state,\
                s.start_time,\
                s.end_time,\
				a.preferred_date\
                FROM\
                appointment a\
                JOIN doctor d ON d.doctor_id = a.doctor_id\
                JOIN cases c ON c.case_id = a.case_id\
                JOIN patient p ON p.patient_id = c.patient_id\
				JOIN slots s ON s.appointment_id=a.appointment_id\
                WHERE\
                a.appointment_id = ?\
                ',
				[appointment_id],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Details Found Successfully",
							data: { appointment_details: result[0] },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default getAppointmentUsers;
