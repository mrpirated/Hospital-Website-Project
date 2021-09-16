import connection from "../../dbconn/db";
import checkToken from "../../checkToken";
const remaining_appointment = async (req, res) => {
	try {
		const decodedData = checkToken(req.body.token);
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
				"SELECT * FROM appointment WHERE start_time=NULL AND end_time=NULL",
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
