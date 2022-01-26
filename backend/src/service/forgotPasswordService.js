import dbg from "debug";
const debug = dbg("service:forgotPasswordService");
import twilioOTP from "../controllers/twilioOTP";
import updatePassword from "../data/updatePassword";
import hashPassword from "../controllers/hashPassword";
const forgotPasswordService = async ({ user }) => {
	return await twilioOTP(user)
		.then((response) => {
			if (user.code) {
				if (response === "approved") {
					return hashPassword(user.password);
				} else {
					return Promise.reject({ success: false, message: "Invalid OTP" });
				}
			} else {
				return response;
			}
		})
		.then((response) => {
			return;
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default forgotPasswordService;
