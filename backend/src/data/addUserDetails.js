import connection from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:addUserDetails");

const addUserDetails = (val, decoded) => {
	return new Promise((resolve, reject) => {
		debug(decoded);
		var values = {};
		if (val.dob !== undefined) values.dob = val.dob;
		if (val.gender !== undefined) values.gender = val.gender;
		if (val.address !== undefined) values.address = val.address;

		connection.query(
			"UPDATE ?? SET ? WHERE ?? = ?",
			[decoded.type, values, decoded.type + "_id", decoded.user_id],
			(err, result) => {
				debug(result);
				if (err) {
					reject({ success: false, message: err });
				} else
					resolve({ success: true, message: "Details added successfully" });
			}
		);
	});
};
export default addUserDetails;
