import checkToken from "../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:verifyPhone");
import twilioOTP from "../controllers/twilioOTP";
import updatePhone from "../data/updatePhone";
const verifyPhoneService = async (token, { user }) => {
	var decoded;
	return await checkToken(token)
		.then((response) => {
			decoded = response.data.decoded;
			return twilioOTP(user);
		})
		.then((response) => {
			if (user.otp === undefined) {
				return response;
			} else {
				if (response === "approved") {
					return updatePhone(decoded.type, user.phone, decoded.user_id);
				} else {
					return Promise.reject({ success: false, message: "Invalid OTP" });
				}
			}
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default verifyPhoneService;
