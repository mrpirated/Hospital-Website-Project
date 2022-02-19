import dbg from "debug";
const debug = dbg("data:getUnscheduledAppointment");
import pool from "../dbconn/db";

const getUnscheduledAppointment = (doctor_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				'SELECT a.appointment_id,\
				a.start_time,\
				a.end_time,\
				a.preferred_date,\
				c.patient_id\
				FROM appointment a\
				JOIN cases c\
				ON c.case_id=a.case_id\
				WHERE state="pending"\
				AND a.doctor_id=?',
				[doctor_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						debug(result);
						resolve({ success: true, data: { appointment: result } });
					}
				}
			);
			connection.release();
		});
	});
};
export default getUnscheduledAppointment;
