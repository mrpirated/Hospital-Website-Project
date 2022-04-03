import dbg from "debug";
const debug = dbg("data:getAllDoctorInfo");
import pool from "../dbconn/db";

const getAllDoctorInfo = (doctor_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT first_name,\
                last_name,\
                email,\
                dob,\
                address,\
                gender\
                FROM doctor WHERE doctor_id = ?\
                ",
				[doctor_id],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Details Found Successfully",
							data: { user: result[0] },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default getAllDoctorInfo;
