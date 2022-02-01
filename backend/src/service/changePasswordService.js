import dbg from "debug";
const debug = dbg("service:changePasswordService");
import checkToken from "../controllers/checkToken";
import getUserPassword from "../data/getUserPassword";
import checkPassword from "../controllers/checkPassword";
import hashPassword from "../controllers/hashPassword";
import changePasword from "../data/changePassword";
import changePassword from "../data/changePassword";
const changePasswordService = async (token, { password, newPassword }) => {
	var decoded;
	return await checkToken(token)
		.then((response) => {
			decoded = response.data.decoded;
			debug(decoded);
			return response.data.decoded;
		})
		.then((response) => {
			//debug(response);
			return getUserPassword(response.type, response.user_id);
		})
		.then((response) => {
			return checkPassword({
				user_password: password,
				password: response.data.password,
			});
		})
		.then((response) => {
			return changePassword(
				decoded.type,
				decoded.user_id,
				hashPassword(newPassword)
			);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default changePasswordService;
