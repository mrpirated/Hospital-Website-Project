import axios from "axios";
import config from "../config/config";
const verifyEmailAPI = async (data) => {
	const { token, user } = data;
	return await axios
		.post(
			config.baseUrl + config.verifyEmail,
			{ user: user },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		});
};
export default verifyEmailAPI;
