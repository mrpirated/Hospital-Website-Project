import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

export const checkPassword = async ({
	user_password,
	password,
	user_id,
	type,
}) => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(user_password, password, (bErr, bResult) => {
			if (bResult) {
				const token = jwt.sign(
					{ user_id: user_id, type: type },
					config.SECRET_KEY,
					{
						expiresIn: "30d",
					}
				);
				resolve({ success: true, token });
			} else {
				reject({
					success: false,
					message: "Username or password is incorrect!",
				});
			}
		});
	});
};
