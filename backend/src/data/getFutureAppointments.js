import dbg from "debug";
const debug = dbg("data:getFutureAppointments");
import connection from "../dbconn/db";

const getFutureAppointments = (user_id, preferred_date) => {
	return new Promise((resolve, reject) => {
		connection.query(
			"SELECT \
            start_time, \
            end_time \
            FROM \
            appointment \
            WHERE \
            doctor_id = ? \
            AND end_time > ?\
            ORDER BY start_time",
			[user_id, preferred_date],
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
	});
};
export default getFutureAppointments;
