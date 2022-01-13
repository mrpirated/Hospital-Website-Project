import dbg from "debug";
const debug = dbg("controller:getUser");
import connection from "../dbconn/db";

const getUser = (decoded) => {
	return new Promise((resolve, reject) => {
		connection.query(
			"SELECT * FROM ?? WHERE ??=?",
			[decoded.type, decoded.type + "_id", decoded.user_id],
			(err, result) => {
				if (err) {
					debug(err);
					reject({ success: false, message: err });
				} else {
					//debug(result);
					if (result[0]) {
						resolve({
							success: true,
							message: "User Details Found",
							data: { user: result[0], type: decoded.type },
						});
					} else {
						reject({ success: false, message: "No user found" });
					}
				}
			}
		);
	});
};
export default getUser;
