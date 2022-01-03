import dbg from "debug";
const debug = dbg("data:getSchedule");
import connection from "../dbconn/db";
const getSchedule = (user_id, end_time) => {
	return new Promise((resolve, reject) => {
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
			[user_id, end_time],
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
	});
};

export default getSchedule;
