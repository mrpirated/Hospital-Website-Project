import dbg from "debug";
const debug = dbg("data:getMultipleAppointments");
import pool from "../dbconn/db";

const getMultipleAppointments = (appointments) => {
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
                c.case_description,\
                CONCAT(d.first_name," ", d.last_name) AS doctor_name,\
                CONCAT(p.first_name," ", p.last_name) AS patient_name,\
                a.end_time,\
                a.start_time\
                FROM\
                appointment a\
                JOIN doctor d ON a.doctor_id = d.doctor_id\
                JOIN cases c ON a.case_id=c.case_id\
                JOIN patient p ON p.patient_id = c.patient_id\
                WHERE a.appointment_id IN (?)\
            ',
				[appointments],
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
export default getMultipleAppointments;
