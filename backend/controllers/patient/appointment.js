import connection from "../../dbconn/db";
import dotenv from "dotenv";
dotenv.config();

import checkToken from "../../checkToken";
import { query } from "express";

export const MyAppointment = async (req, res) => {
	try {
		//console.log(req.query.token, req.query.case_id);
		const decodedData = checkToken(req.query.token);
		if (decodedData == undefined) {
			return res.status(209).send({
				msg: "Token Is Invalid. No such User found.",
			});
		} else {
			const user = decodedData.user;
			console.log(user.patient_id, req.body.case_id);
			var q = connection.query(
				"SELECT case_id FROM cases WHERE patient_id = ? AND case_id = ?",
				[user.patient_id, req.query.case_id],
				(err, result, fields) => {
					//console.log("HELLO" + result);
					//console.log(result);
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else if (result.length) {
						var q1 = connection.query(
							"SELECT * FROM appointment WHERE case_id = ?",
							req.query.case_id,
							(err, result, fields) => {
								if (err) {
									return res.status(210).send({
										msg: err,
									});
								}
								return res.status(200).send({
									msg: "Successfully returned Appointments!",
									appointments: result,
								});
							}
						);
					} else {
						return res.status(209).send({
							msg: "No Appointments found against this Case.",
						});
					}
				}
			);
		}
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};
export const NewAppointment = async (req, res) => {
	try {
		const decodedData = checkToken(req.body.token);
		if (!decodedData || decodedData.type != 0) {
			if (!decodedData) {
				return res.status(210).send({
					msg: "Token is invalid",
				});
			}
			return res.status(209).send({
				msg: "Not authorized!!",
			});
		} else {
			const values = {
				case_id: req.body.case_id,
				doctor_id: req.body.doctor_id,
				start_time: req.body.start_time,
				end_time: req.body.end_time
			};
			connection.query(
				"INSERT INTO appointment SET ?",
				values,
				(err, result, fields) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else {
						return res.status(200).send({
							msg: "Entered",
						});
					}
				}
			);
		}
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};

export const NewCase = async (req, res) => {
	try {
		const decodedData = checkToken(req.body.token);
		if (!decodedData || decodedData.type != 0) {
			if (!decodedData) {
				return res.status(210).send({
					msg: "Token is invalid",
				});
			}
			return res.status(209).send({
				msg: "Not authorized!!",
			});
		} else {
			var values = {
				patient_id: decodedData.user.patient_id,
			};
			console.log(values);
			connection.query(
				"INSERT INTO cases SET ?",
				values,
				(err, result, fields) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else {
						console.log(result);
						return res.status(200).send({
							msg: "Entered",
							case_id: result.insertId
						});
					}
				}
			);
		}
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};
