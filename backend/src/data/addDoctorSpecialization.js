import pool from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:addDoctorSpecialization");
const addDoctorSpecialization = (user_id, specialization) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection" });
			}
			connection.query(
				"SELECT * FROM specialization WHERE name = ?",
				[specialization],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						debug(result);
						var values = { doctor_id: user_id, specialization_id: 0 };
						if (!result[0]) {
							connection.query(
								"INSERT INTO specialization SET ?",
								{
									name: specialization,
								},
								(err, result) => {
									if (err) {
										reject({ success: false, message: err });
									} else {
										values.specialization_id = result.insertId;
										connection.query(
											"INSERT INTO doctor_specialization SET ?",
											[values],
											(err, result) => {
												if (err) {
													if (err.code === "ER_DUP_ENTRY") {
														reject({
															success: false,
															message: "Specialization Already Exists",
														});
													} else {
														reject({ success: false, message: err });
													}
												} else {
													resolve({
														success: true,
														message: "Specialization Added",
													});
												}
											}
										);
									}
								}
							);
						} else {
							values.specialization_id = result[0].specialization_id;
							debug(values);
							connection.query(
								"INSERT INTO doctor_specialization SET ?",
								[values],
								(err, result) => {
									if (err) {
										if (err.code === "ER_DUP_ENTRY") {
											reject({
												success: false,
												message: "Specialization Already Exists",
											});
										} else {
											reject({ success: false, message: err });
										}
									} else {
										resolve({ success: true, message: "Specialization Added" });
									}
								}
							);
						}
					}
				}
			);
			connection.release();
		});
	});
};

export default addDoctorSpecialization;
