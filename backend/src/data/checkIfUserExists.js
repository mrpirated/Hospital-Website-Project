import connection from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:checkIfUserExists");
const checkIfUserExists = async ({ type, email }) => {
	return new Promise((resolve, reject) => {
		connection.query(
			"SELECT * FROM ?? WHERE email = ?",
			[type, email],
			(err, result) => {
				if (err) {
					debug(err);
					reject({ success: false, message: err });
				} else {
					//debug(result);
					resolve(result);
				}
			}
		);
	});
};
export default checkIfUserExists;
