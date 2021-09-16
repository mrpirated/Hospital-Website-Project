import connection from "../../dbconn/db";
import dotenv from "dotenv";
dotenv.config();

import checkToken from "../../checkToken";

const appointment = async (req, res) => {
	try {
		const decodedData = checkToken(req.body.token);
		if (decodedData == undefined) {
			return res.status(209).send({
				msg: "Token Is Invalid. No such User found.",
			});
		} else {
			const user = decodedData.user;
			var q = connection.query(
				"SELECT case_id FROM cases WHERE patient_id = ? AND case_id = ?",
				[user.patient_id, req.body.case_id],
				(err, result, fields) => {
					//console.log("HELLO" + result);
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else if (result.size) {
						var q1 = connection.query(
							"SELECT * FROM appointment WHERE case_id = ?",
							req.body.case_id,
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
							msg: "Invalid Request. No such case found.",
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

export default appointment;
