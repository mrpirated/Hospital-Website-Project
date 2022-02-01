import axios from "axios";
import config from "../config/config";
const changePasswordAPI = async (data) => {
	const { token, password, newPassword } = data;
	return await axios
		.post(
			config.baseUrl + config.changePassword,
			{
				password,
				newPassword,
			},
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		});
};

export default changePasswordAPI;
