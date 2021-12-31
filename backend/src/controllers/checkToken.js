import jwt from "jsonwebtoken";
import config from "../config";
const checkToken = (token) => {
	//console.log(token);
	return new Promise((resolve, reject) => {
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
