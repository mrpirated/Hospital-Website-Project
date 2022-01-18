import dbg from "debug";
const debug = dbg("data:setAvailability");
import pool from "../dbconn/db";
const setAvailability = (user_id, { st, et, start_time, end_time }) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
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
								"DELETE FROM schedule WHERE doctor_id = ? \
							AND start_time > ? AND start_time < ? AND end_time > ? AND end_time < ?",
								[user_id, start_time, end_time, start_time, end_time],
								(err) => {
									if (err) {
										debug(err);
										reject({ success: false, message: err });
									}
								}
							);
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
					"DELETE FROM schedule WHERE doctor_id = ? \
					AND start_time > ? AND start_time < ? AND end_time > ? AND end_time < ?",
					[user_id, start_time, end_time, start_time, end_time],
					(err) => {
						if (err) {
							debug(err);
							reject({ success: false, message: err });
						}
					}
				);
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
					"DELETE FROM schedule WHERE doctor_id = ? \
					AND start_time > ? AND start_time < ? AND end_time > ? AND end_time < ?",
					[user_id, start_time, end_time, start_time, end_time],
					(err) => {
						if (err) {
							debug(err);
							reject({ success: false, message: err });
						}
					}
				);
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
			connection.release();
		});
	});
};
export default setAvailability;
