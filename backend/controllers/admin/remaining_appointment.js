import connection from "../../dbconn/db";
import checkToken from "../../checkToken";
const remaining_appointment = async (req, res) => {
	try {
		//console.log(req.query);
		const decodedData = checkToken(req.query.token);
		//console.log(req.params.token);
		if (!decodedData || decodedData.type != 2) {
			if (!decodedData) {
				return res.status(210).send({
					msg: "Token is invalid",
				});
			}
			return res.status(209).send({
				msg: "Not authorized!!",
			});
		} else {
			connection.query(
				"SELECT * FROM appointment WHERE start_time IS NULL AND end_time IS NULL",
				(err, result, fields) => {
					if (err) {
						return res.status(209).send({
							msg: err,
						});
					} else {
						return res.status(200).send(result);
					}
				}
			);
		}
	} catch (error) {
		//console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};

export default remaining_appointment;
