import dbg from "debug";
const debug = dbg("data:getDoctors");
import pool from "../dbconn/db";

const getDoctors = () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			connection.query(
				"SELECT CONCAT(\"D\",YEAR(created),LPAD(doctor_id, 4, '0')) AS username, doctor_id, first_name, last_name, dob, gender, address, email, phone,profile_pic FROM doctor",
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
			connection.release();
		});
	});
};
export default getDoctors;
