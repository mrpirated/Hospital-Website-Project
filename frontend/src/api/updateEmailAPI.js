import axios from "axios";
import config from "../config/config";
const updateEmailAPI = async (data) => {
	const { token, user } = data;
	return await axios
		.post(
			config.baseUrl + config.updateEmail,
			{ user: user },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		});
};
export default updateEmailAPI;
