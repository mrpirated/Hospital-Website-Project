import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:checkIfUserExists");
const checkIfUserExists = async ({ type, email }) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT * FROM ?? WHERE email = ?",
				[type, email],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						//debug(result);

						if (result.length > 0) {
							resolve({
								success: true,
								message: "User Found",
								data: { user: result[0] },
							});
						} else {
							resolve({
								success: false,
								message: "No Account found with email: " + email,
							});
						}
					}
				}
			);
			connection.release();
		});
	});
};
export default checkIfUserExists;
