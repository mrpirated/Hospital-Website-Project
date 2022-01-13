import jwt from "jsonwebtoken";
import dbg from "debug";
const debug = dbg("controller:checkToken");
import config from "../config";
const checkToken = (bearertoken) => {
	//console.log(token);
	return new Promise((resolve, reject) => {
		debug(bearertoken);
		const token = bearertoken.split(" ")[1];
		jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
			if (err) {
				reject({ success: false, message: err });
			}
			//console.log(decoded);
			resolve({
				success: true,
				message: "Token Verified",
				data: { decoded: decoded },
			});
		});
	});
};

export default checkToken;
