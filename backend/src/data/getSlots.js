import dbg from "debug";
const debug = dbg("data:getSlots");
import pool from "../dbconn/db";

const getSlots = (user_id, date) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			debug(date);
			connection.query(
				"SELECT slot_id,\
                start_time,\
                end_time FROM slots WHERE doctor_id = ? \
                AND DATE(start_time) = DATE(?)",
				[user_id, date],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Slots found Successfully",
							data: { slots: result },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default getSlots;
