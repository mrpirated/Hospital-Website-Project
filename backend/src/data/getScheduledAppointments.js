import dbg from "debug";
const debug = dbg("data:getSchedule");
import pool from "../dbconn/db";

const getScheduledAppointments = ({ type, user_id }) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			var tp;
			if (type == "patient") tp = "p.patient_id";
			else tp = "d.doctor_id";
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
                WHERE state="scheduled" AND ?? = ?\
            ',
				[tp, user_id],
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
		});
	});
};
export default getScheduledAppointments;
