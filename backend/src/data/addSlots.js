import pool from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:addSlots");
import moment from "moment";
const addSlots = (user_id, slots) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			var values = [];
			slots.forEach((s) => {
				values.push([
					user_id,
					moment(s.start_time).format("YYYY-MM-DD HH:mm:ss"),
					moment(s.end_time).format("YYYY-MM-DD HH:mm:ss"),
				]);
			});
			debug(values);
			connection.query(
				"INSERT INTO slots (doctor_id,start_time,end_time) VALUES ?",
				[values],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else resolve({ success: true, message: result });
				}
			);
			connection.release();
		});
	});
};
export default addSlots;
