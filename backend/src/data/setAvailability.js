import dbg from "debug";
const debug = dbg("data:setAvailability");
import connection from "../dbconn/db";
const setAvailability = (user_id, { st, et, start_time, end_time }) => {
	return new Promise((resolve, reject) => {
		if (st && et) {
			connection.query(
				"SELECT end_time FROM schedule WHERE doctor_id = ? AND start_time = ? ",
				[user_id, end_time],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						debug(result[0].end_time);
						connection.query(
							"DELETE FROM schedule WHERE doctor_id = ? AND start_time = ? ",
							[user_id, end_time],
							(err) => {
								if (err) {
									debug(err);
									reject({ success: false, message: err });
								}
							}
						);
						//end_time = result[0].end_time;
						values = {
							end_time: result[0].end_time,
						};
						connection.query(
							"UPDATE schedule SET ? WHERE doctor_id = ? AND end_time=?",
							[values, user_id, start_time],
							(err, result) => {
								if (err) {
									debug(err);
									reject({ success: false, message: err });
								} else {
									resolve({ success: true, message: result });
								}
							}
						);
					}
				}
			);
		} else if (st) {
			var values = {
				end_time: end_time,
			};
			connection.query(
				"UPDATE schedule SET ? WHERE doctor_id = ? AND end_time = ?",
				[values, user_id, start_time],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({ success: true, message: result });
					}
				}
			);
		} else if (et) {
			var values = {
				start_time: start_time,
			};
			connection.query(
				"UPDATE schedule SET ? WHERE doctor_id = ? AND start_time = ?",
				[values, user_id, end_time],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({ success: true, message: result });
					}
				}
			);
		} else {
			var values = {
				doctor_id: user_id,
				start_time: start_time,
				end_time: end_time,
			};
			connection.query(
				"INSERT INTO schedule SET ?",
				[values],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({ success: true, message: result });
					}
				}
			);
		}
	});
};
export default setAvailability;
