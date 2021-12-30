import connection from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:addNewUser");
const addNewUser = async (user) => {
	return new Promise((resolve, reject) => {
		if (user.type === "admin") {
			var value = { email: user.email, password: user.password };
			connection.query("INSERT INTO admin SET ?", value, (err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else resolve({ success: true, message: result });
			});
		} else {
			var value = {
				first_name: user.first_name,
				last_name: user.last_name,
				dob: user.dob,
				gender: user.gender,
				address: user.address,
				email: user.email,
				phone: user.phone,
				password: user.password,
			};

			connection.query(
				"INSERT INTO ?? set ?",
				[user.type, value],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else resolve({ success: true, message: result, user: user });
				}
			);
		}
	});
};
export default addNewUser;
