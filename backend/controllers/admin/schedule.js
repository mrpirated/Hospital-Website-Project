import connection from "../../dbconn/db";
import dotenv from "dotenv";
dotenv.config();

import checkToken from "../../checkToken";

export const get_doctor_schedule = async (req, res) => {
	try {
		console.log(req.query);
		//console.log(req);
		const decodedData = checkToken(req.query.token);
		//console.log(decodedData);
		if (decodedData == undefined) {
			return res.status(209).send({
				msg: "Token Is Invalid. No such User found.",
			});
		} else {
			if (decodedData.type != 2) {
				return res.status(209).send({
					msg: "Not authorized",
				});
			}
			var q = connection.query(
				"SELECT start_time, end_time FROM schedule WHERE doctor_id = ?",
				[req.query.doctor_id],
				(err, result, fields) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else {
						return res.status(200).send({
							msg: "Successfully returned Schedule!",
							schedule: result,
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
