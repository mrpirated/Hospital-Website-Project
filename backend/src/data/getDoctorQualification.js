import pool from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:getDoctorQualification");

const getDoctorQualification = (doctor_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT\
				s.qualification_id,\
				s.name\
			  	FROM\
				qualification s\
				JOIN doctor_qualification ds ON ds.qualification_id = s.qualification_id\
			  	WHERE\
				ds.doctor_id = ?\
			  ",
				[doctor_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						// var Qualification = [];
						// result.forEach((spec) => {
						// 	Qualification.push(spec.name);
						// });
						resolve({ success: true, data: { qualification: result } });
					}
				}
			);
			connection.release();
		});
	});
};
export default getDoctorQualification;
