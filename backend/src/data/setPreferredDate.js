import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:setPreferredDate");

const setPreferredDate = (appointment_id, preferred_date) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"UPDATE appointment SET preferred_date = ? WHERE appointment_id = ?",
				[preferred_date, appointment_id],
				(err, result) => {
					if (err) reject({ success: false, message: err });
					else
						resolve({
							success: true,
							message: "Preferred Date Updated Successfully",
						});
				}
			);
		});
	});
};
export default setPreferredDate;
