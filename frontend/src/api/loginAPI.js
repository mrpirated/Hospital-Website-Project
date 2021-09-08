import axios from "axios";
import config from "../config/config.json";

const loginAPI = (data) => {
	const { email, password } = data;
	return axios
		.post(config.baseUrl + config.login, {
			email: email,
			password: password,
		})
		.then((res) => {
			if (res.status === 200) {
				//console.log(res.data);
				return res.data;
			}
			if (res.status === 209) {
				console.log(res.data.msg);
			}
		})
		.catch();
};
export default loginAPI;
