import axios from "axios";
import config from "../config/config";
const verifyPhoneAPI = async (data) => {
	const { token, user } = data;
	return await axios
		.post(
			config.baseUrl + config.verifyPhone,
			{ user: user },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		});
};
export default verifyPhoneAPI;
