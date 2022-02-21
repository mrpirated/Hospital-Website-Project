import dbg from "debug";
const debug = dbg("service:updateEmail");
import checkToken from "../controllers/checkToken";
import checkIfUserExists from "../data/checkIfUserExists";
import verifyEmailService from "./verifyEmailService";
import updateEmail from "../data/updateEmail";
const updateEmailService = async (token, { email, code, otp }) => {
	var decoded;
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
			return verifyEmailService(token, { email, code, otp });
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
