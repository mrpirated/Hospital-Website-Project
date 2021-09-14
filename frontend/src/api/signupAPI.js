import axios from "axios";
import config from "../config/config.json";
import loginAPI from "./loginAPI";

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
		.post(config.baseUrl + config.signup, {
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
				return loginAPI({ email, password });
			} else if (res.status === 210) {
				console.log(res.data.msg);
			}
		})
		.catch((err) => {
			//console.log("Error Occured in Signup");
		});
};

export default signupAPI;