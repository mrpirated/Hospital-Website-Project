import axios from "axios";
import config from "../config/config";

const loginAPI = async (data) => {
	const { email, password, type } = data;
	console.log(config.baseUrl);
	return await axios
		.post(config.baseUrl + config.login, {
			email: email,
			password: password,
			type: type,
		})
		.then((res) => {
			return res.data;

			if (res.status === 200) {
				//console.log(res.data);
				//return res.data;
				return {
					reply: true,
					data: res.data,
				};
			} else if (res.status === 210) {
				console.log(res.data.msg);
				return {
					reply: false,
					data: res.data,
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
			console.log(err);
			return { success: false, message: err.message };
		});
};
export default loginAPI;
