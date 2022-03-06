import dbg from "debug";
const debug = dbg("controller:getUserEmails");
import pool from "../dbconn/db";

const helper = ({ user_id, type }) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT email FROM ?? WHERE ??=?",
				[type, type + "_id", user_id],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						//debug(result);
						if (result[0]) {
							resolve({
								success: true,
								message: "Email Found",
								data: { email: result[0].email },
							});
						} else {
							resolve({ success: false, message: "No user found" });
						}
					}
				}
			);
			connection.release();
		});
	});
};
const getUserEmail = (users) => {
	return new Promise((resolve, reject) => {
		var allEmails = [];
		users.forEach((user) => {
			allEmails.push(helper(user));
		});
		Promise.all(allEmails)
			.then((response) => {
				var emails = [];
				response.forEach((resp) => {
					if (resp.success) emails.push(resp.data.email);
				});
				debug(emails);
				resolve({
					success: true,
					message: "Emails Returned Successfully",
					data: { emails: emails },
				});
			})
			.catch((err) => {
				reject({ success: false, message: err });
			});
	});
};
export default getUserEmail;
