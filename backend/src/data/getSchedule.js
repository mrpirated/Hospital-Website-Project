import dbg from "debug";
const debug = dbg("controller:getSchedule");
import connection from "../dbconn/db";
const getSchedule = (user_id) => {
	return new Promise((resolve, reject) => {
		connection.query(
			"SELECT * FROM schedule WHERE doctor_id = ? AND end_time > NOW()",
			[user_id],
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
