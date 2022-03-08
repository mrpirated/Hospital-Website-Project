import dbg from "debug";
const debug = dbg("data:getFuturePatientAppointments");
import pool from "../dbconn/db";

const getFuturePatientAppointments = (patient_id, preferred_date) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				'SELECT \
                GREATEST(start_time, ?) AS start_time, \
                end_time \
                FROM \
                appointment a\
                JOIN cases c ON c.case_id=a.case_id\
                WHERE \
                c.patient_id = ? \
                AND state != "pending"\
				AND state != "cancelled"\
                AND end_time > ?\
                ORDER BY start_time',
				[preferred_date, patient_id, preferred_date],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Appointments found Successfully",
							data: { appointment: result },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default getFuturePatientAppointments;
