import dbg from "debug";
const debug = dbg("data:getSchedule");
import pool from "../dbconn/db";
const getPatients = () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT \
				CONCAT(\"P\",YEAR(created),LPAD(patient_id, 4, '0')) AS username,\
				patient_id, \
				first_name, \
                last_name, \
                dob, gender, address, email, phone\
				FROM \
				patient",
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Patients Found Successfully",
							data: { patient: result },
						});
					}
				}
			);
			connection.release();
		});
	});
};

export default getPatients;
