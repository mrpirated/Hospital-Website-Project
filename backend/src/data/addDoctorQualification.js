import pool from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:addDoctorQualification");
const addDoctorQualification = (user_id, qualification) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection" });
			}
			connection.query(
				"SELECT * FROM qualification WHERE name = ?",
				[qualification],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else {
						debug(result);
						var values = { doctor_id: user_id, qualification_id: 0 };
						if (!result[0]) {
							connection.query(
								"INSERT INTO qualification SET ?",
								{
									name: qualification,
								},
								(err, result) => {
									if (err) {
										reject({ success: false, message: err });
									} else {
										values.qualification_id = result.insertId;
										connection.query(
											"INSERT INTO doctor_qualification SET ?",
											[values],
											(err, result) => {
												if (err) {
													if (err.code === "ER_DUP_ENTRY") {
														reject({
															success: false,
															message: "Qualification Already Exists",
														});
													} else {
														reject({ success: false, message: err });
													}
												} else {
													resolve({
														success: true,
														message: "Qualification Added",
													});
												}
											}
										);
									}
								}
							);
						} else {
							values.qualification_id = result[0].qualification_id;
							debug(values);
							connection.query(
								"INSERT INTO doctor_qualification SET ?",
								[values],
								(err, result) => {
									if (err) {
										if (err.code === "ER_DUP_ENTRY") {
											reject({
												success: false,
												message: "Qualification Already Exists",
											});
										} else {
											reject({ success: false, message: err });
										}
									} else {
										resolve({ success: true, message: "Qualification Added" });
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

export default addDoctorQualification;
