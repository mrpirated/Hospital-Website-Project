import dbg from "debug";
const debug = dbg("service:verifyEmail");
import checkToken from "../controllers/checkToken";
import { v4 as uuidv4 } from "uuid";
import sendMail from "../controllers/sendMail";
const codes = {};
const getNewOtp = () => {
	var str = "";
	for (var i = 0; i < 6; i++) {
		str += Math.round(Math.random() * 10).toString()[0];
	}
	return str;
};
const verifyEmailService = async (token, { email, otp, code }) => {
	return await checkToken(token).then((response) => {
		if (!otp || !code) {
			const newOtp = getNewOtp();
			debug(newOtp);
			const code = uuidv4();
			codes[code] = newOtp;
			sendMail({
				to: email,
				subject: "PeriwalManavSeva Email Verification",
				text: "Your OTP for Verification is " + newOtp,
			});
			debug(codes);
			return Promise.resolve({
				success: true,
				message: "OTP sent successfully",
				data: { code: code },
			});
		} else {
			if (codes[code] === otp) {
				delete codes[code];
				debug(codes);
				return Promise.resolve({
					success: true,
					message: "Email Verified Successfully",
				});
			} else {
				return Promise.resolve({ success: false, message: "Invalid OTP" });
			}
		}
	});
};

export default verifyEmailService;
