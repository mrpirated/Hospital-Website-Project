import axios from "axios";
import config from "../config/config.json";

const loginAPI = (data) => {
	const { email, password, type } = data;
	return axios
		.post(
			config.baseUrl +
				(type === 0 ? config.patient : config.doctor) +
				config.login,
			{
				email: email,
				password: password,
			}
		)
		.then((res) => {
			if (res.status === 200) {
				//console.log(res.data);
				//return res.data;
				return {
					reply: true,
					data: res.data
				}
			}
			else if(res.status === 210) {
				console.log(res.data.msg);
				return {
					reply: false,
					data : res.data.msg.errors[0]
				}
			}
			else {
				console.log(res.data.msg);
				return {
					reply: false,
					data : res.data
				}
			}
		})
		.catch();
};
export default loginAPI;
