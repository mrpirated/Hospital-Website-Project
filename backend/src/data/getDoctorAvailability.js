import dbg from "debug";
const debug = dbg("data:getDoctorAvailability");
import pool from "../dbconn/db";
const getDoctorAvailability = (user_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT start_time,end_time FROM schedule WHERE doctor_id = ?",
				[user_id],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Availability Found Successfully",
							data: { availability: result },
						});
					}
				}
			);
			connection.release();
		});
	});
};

export default getDoctorAvailability;
