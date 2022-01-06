import axios from "axios";
import config from "../config/config";
// import loginAPI from "./loginAPI";

const signupAPI = async (data) => {
	const { type, first_name, last_name, email, phone, password, otp } = data;
	return await axios
		.post(config.baseUrl + config.signup, {
			type,
			first_name,
			last_name,
			email,
			phone,
			password,
			otp,
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log("Error Occured in Signup:" + err);
		});
};

export default signupAPI;
