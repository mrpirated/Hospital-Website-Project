import dbg from "debug";
const debug = dbg("data:getSchedule");
import pool from "../dbconn/db";
const getSchedule = (user_id, preferred_date) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT \
				start_time, \
				end_time \
				FROM \
				schedule \
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
							message: "Schedule found Successfully",
							data: { schedule: result },
						});
					}
				}
			);
			connection.release();
		});
	});
};

export default getSchedule;
