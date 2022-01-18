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
				'SELECT appointment_id,\
				start_time,\
				end_time,\
				preferred_date\
				FROM appointment\
				WHERE state="pending"\
				AND doctor_id=?',
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
