import dbg from "debug";
const debug = dbg("service:updateEmail");
import checkToken from "../controllers/checkToken";
import checkIfUserExists from "../data/checkIfUserExists";
import verifyEmailService from "./verifyEmailService";
import updateEmail from "../data/updateEmail";
const updateEmailService = async (token, { user }) => {
	var decoded;
	const { email } = user;
	return await checkToken(token)
		.then((response) => {
			decoded = response.data.decoded;
			return checkIfUserExists({ type: response.data.decoded.type, email });
		})
		.then((response) => {
			if (response.success) {
				return Promise.reject({
					success: false,
					message: "User Already Exists",
				});
			}
			return verifyEmailService(token, { user });
		})
		.then((response) => {
			if (response.message === "Email Verified Successfully") {
				return updateEmail(decoded.type, decoded.user_id, email);
			} else return response;
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default updateEmailService;
