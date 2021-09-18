import axios from "axios";
import config from "../config/config.json";
// import loginAPI from "./loginAPI";

const signupAPI = (data) => {
	const {
		first_name,
		last_name,
		dob,
		gender,
		address,
		email,
		phone,
		password,
	} = data;
	return axios
		.post(config.baseUrl + config.patient + config.signup, {
			first_name,
			last_name,
			dob,
			gender,
			address,
			email,
			phone,
			password,
		})
		.then((res) => {
			if (res.status === 200) {
				//return loginAPI({ email, password });
				return {
					reply: true,
				};
			} else if (res.status === 210) {
				console.log(res.data.msg);
				return {
					reply: false,
					data: res.data.msg.errors[0],
				};
			} else {
				console.log(res.data.msg);
				return {
					reply: false,
					data: res.data,
				};
			}
		})
		.catch((err) => {
			//console.log("Error Occured in Signup");
		});
};

export default signupAPI;
