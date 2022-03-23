import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:checkSlot");
const checkSlot = async (doctor_id, slot_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT * FROM slots WHERE slot_id = ?",
				[slot_id],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						//debug(result);
						if (result.length > 0) {
							if (result[0].doctor_id != doctor_id) {
								reject({
									success: false,
									message: "Slot dosen't belong to doctor",
								});
							}
							if (result[0].appointment_id != null) {
								reject({
									success: false,
									message: "Slot already booked",
								});
							}
							resolve({
								success: true,
								message: "Slot available",
							});
						} else {
							reject({
								success: false,
								message: "No slot found",
							});
						}
					}
				}
			);
			connection.release();
		});
	});
};
export default checkSlot;
