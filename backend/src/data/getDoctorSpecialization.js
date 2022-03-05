import pool from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:getDoctorSpecialization");

const getDoctorSpecialization = (doctor_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT\
				s.specialization_id,\
				s.name\
			  	FROM\
				specialization s\
				JOIN doctor_specialization ds ON ds.specialization_id = s.specialization_id\
			  	WHERE\
				ds.doctor_id = ?\
			  ",
				[doctor_id],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						// var specialization = [];
						// result.forEach((spec) => {
						// 	specialization.push(spec.name);
						// });
						resolve({ success: true, data: { specialization: result } });
					}
				}
			);
			connection.release();
		});
	});
};
export default getDoctorSpecialization;
