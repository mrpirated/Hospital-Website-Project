import axios from "axios";
import config from "../config/config";
// import loginAPI from "./loginAPI";

const signupAPI = async (data) => {
	const {
		type,
		first_name,
		last_name,
		dob,
		gender,
		address,
		email,
		phone,
		password,
		otp,
	} = data;
	return await axios
		.post(config.baseUrl + config.signup, {
			type,
			first_name,
			last_name,
			dob,
			gender,
			address,
			email,
			phone,
			password,
			otp,
		})
		.then((res) => {
			return res.data;
			// if (res.status === 200) {
			// 	//return loginAPI({ email, password });
			// 	return {
			// 		reply: true,
			// 	};
			// } else if (res.status === 210) {
			// 	console.log(res.data.msg);
			// 	return {
			// 		reply: false,
			// 		data: res.data,
			// 	};
			// } else {
			// 	console.log(res.data.msg);
			// 	return {
			// 		reply: false,
			// 		data: res.data,
			// 	};
			// }
		})
		.catch((err) => {
			console.log("Error Occured in Signup:" + err);
		});
};

export default signupAPI;
