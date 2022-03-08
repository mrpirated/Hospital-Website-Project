import dbg from "debug";
const debug = dbg("data:getFutureAppointments");
import pool from "../dbconn/db";

const getFutureAppointments = (user_id, preferred_date) => {
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
				appointment \
				WHERE \
				doctor_id = ? \
				AND state != "pending"\
				AND state != "cancelled"\
				AND end_time > ?\
				ORDER BY start_time',
				[preferred_date, user_id, preferred_date],
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
export default getFutureAppointments;
