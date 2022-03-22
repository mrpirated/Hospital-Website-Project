import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:getDoctorDaySlots");

const getDoctorDaySlots = (doctor_id, date) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT slot_id,\
                start_time,\
                end_time,\
                appointment_id\
                FROM slots WHERE doctor_id=? AND DATE(start_time) = ?",
				[doctor_id, date],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						//debug(result);
						if (result.length > 0) {
							resolve({
								success: true,
								message: "Slots Found",
								data: { slots: result },
							});
						} else reject({ success: false, message: "slots not found" });
					}
				}
			);
			connection.release();
		});
	});
};
export default getDoctorDaySlots;
