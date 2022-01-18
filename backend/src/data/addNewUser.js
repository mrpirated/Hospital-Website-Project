import pool from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:addNewUser");
const addNewUser = async (user) => {
	return new Promise((resolve, reject) => {
		var values;
		if (user.type === "admin") {
			values = { email: user.email, password: user.password };
		} else if (user.type == "doctor") {
			values = {
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				password: user.password,
			};
		} else {
			values = {
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				phone: user.phone,
				password: user.password,
			};
		}
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"INSERT INTO ?? set ?",
				[user.type, values],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else resolve({ success: true, message: result, user: user });
				}
			);
			connection.release();
		});
	});
};
export default addNewUser;
