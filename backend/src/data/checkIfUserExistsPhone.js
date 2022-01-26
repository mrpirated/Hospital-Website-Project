import pool from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:checkIfUserExistsPhone");
const checkIfUserExistsPhone = async ({ type, phone }) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT * FROM ?? WHERE phone = ?",
				[type, phone],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						//debug(result);
						resolve({
							success: true,
							message: "User Found",
							data: { user: result[0] },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default checkIfUserExistsPhone;
