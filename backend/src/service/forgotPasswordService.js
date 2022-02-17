import dbg from "debug";
const debug = dbg("service:forgotPasswordService");
import twilioOTP from "../controllers/twilioOTP";
import updatePassword from "../data/updatePassword";
import hashPassword from "../controllers/hashPassword";
import checkIfUserExistsPhone from "../data/checkIfUserExistsPhone";
const forgotPasswordService = async ({ user }) => {
	var user_id;
	var userinfo;
	return await checkIfUserExistsPhone(user)
		.then((response) => {
			if (user.type === "admin") user_id = response.data.user.admin_id;
			else if (user.type === "doctor") user_id = response.data.user.doctor_id;
			else if (user.type === "patient") user_id = response.data.user.patient_id;
			userinfo = (({ first_name, last_name, email }) => ({
				first_name,
				last_name,
				email,
			}))(response.data.user);

			return twilioOTP(user);
		})
		.then((response) => {
			if (user.otp) {
				if (response === "approved") {
					return hashPassword(user.password);
				} else {
					return Promise.reject({ success: false, message: "Invalid OTP" });
				}
			} else {
				response.data.user = userinfo;
				return response;
			}
		})
		.then((response) => {
			if (user.otp === undefined) {
				return response;
			}

			return updatePassword(user.type, response, user_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default forgotPasswordService;
