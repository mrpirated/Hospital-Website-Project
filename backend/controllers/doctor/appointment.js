import connection from "../../dbconn/db";
import dotenv from "dotenv";

dotenv.config();

import checkToken from "../../checkToken";
import { format } from "mysql";

export const appointment = async (req, res) => {
	try {
		const decodedData = checkToken(req.query.token);

		if (decodedData === undefined || decodedData.type !== 1) {
			return res.status(209).send({
				msg: "Invalid Request",
			});
		} else {
			// const today = new Date();
			// const nextDay = new Date((new Date()).valueOf() + 1000*3600*24);
			// const start_date = today.toISOString().slice(0, 10);
			// const end_date = nextDay.toISOString().slice(0, 10);
			// const start_time = start_date + " " + "00:00:00";
			// const end_time = end_date + " " + "00:00:00";
			// console.log(start_time);
			// console.log(end_time);
			if (req.query.start_time != undefined) {
				console.log(req.query);
				var q = connection.query(
					"SELECT * from appointment WHERE doctor_id=? AND start_time BETWEEN ? AND ?",
					[
						decodedData.user.doctor_id,
						req.query.start_time,
						req.query.end_time,
					],
					(err, result, fields) => {
						if (err) {
							return res.status(210).send({
								msg: err,
							});
						} else {
							return res.status(200).send({
								msg: "Successfully returned Appointments!",
								appointments: result,
							});
						}
					}
				);
			} else {
				var q = connection.query(
					"SELECT appointment_id as id, doctor_id as Subject, start_time as StartTime, end_time as EndTime from appointment WHERE doctor_id=?",
					[decodedData.user.doctor_id],
					(err, result, fields) => {
						if (err) {
							return res.status(210).send({
								msg: err,
							});
						} else {
							return res.status(200).send({
								msg: "Successfully returned Appointments!",
								appointments: result,
							});
						}
					}
				);
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};
export const setAvailability = async (req, res) => {
	try {
		const decodedData = checkToken(req.body.token);

		if (decodedData === undefined || decodedData.type !== 1) {
			return res.status(209).send({
				msg: "Invalid Request",
			});
		} else {
			//console.log(decodedData);
			connection.query(
				"SELECT start_time, end_time FROM schedule WHERE doctor_id = ?",
				[decodedData.user.doctor_id],
				(err, result, fields) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else {
						//console.log(result);
						console.log(req.body);
						var st = new Date(req.body.start_time);
						var et = new Date(req.body.end_time);
						for (var i = 0; i < result.length; i++) {
							if (result[i].start_time <= st && result[i].end_time >= st) {
								st = result[i].end_time;
								if (result[i].start_time <= et && result[i].end_time >= et)
									et = result[i].end_time;
							} else if (
								result[i].start_time <= et &&
								result[i].end_time >= et
							) {
								et = result[i].start_time;
							}
						}
						console.log(st + " " + et);
						if (st < et) {
							connection.query(
								"INSERT INTO schedule VALUES(?,?,?)",
								[decodedData.user.doctor_id, st, et],
								(err, result, query) => {
									if (err) {
										return res.status(210).send({
											msg: err,
										});
									} else {
										return res.status(200).send(result);
									}
								}
							);
						} else res.send("No new Availability");
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
