import dbg from "debug";
const debug = dbg("data:getDoctors");
import pool from "../dbconn/db";

const getDoctors = () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			connection.query(
				"SELECT doctor_id, first_name, last_name, dob, gender, address, email, phone,profile_pic FROM doctor",
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Doctors Found Successfully",
							data: { doctor: result },
						});
					}
				}
			);
			debug(pool._freeConnections.length);
			connection.release();
			debug(pool._freeConnections.length);
		});
	});
};
export default getDoctors;
