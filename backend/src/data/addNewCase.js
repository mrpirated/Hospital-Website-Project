import pool from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:addNewCase");

const addNewCase = (user_id, case_description) => {
	return new Promise((resolve, reject) => {
		var values = { case_description: case_description, patient_id: user_id };
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query("INSERT INTO cases SET ?", [values], (err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else {
					resolve({
						success: true,
						message: "New Case Created",
						data: { case_id: result.insertId },
					});
				}
			});
			connection.release();
		});
	});
};
export default addNewCase;
