import axios from "axios";
import config from "../config/config";

const forgotPasswordAPI = async (data) => {
	return await axios
		.post(config.baseUrl + config.forgotPassword, { user: data.user })
		.then((res) => res.data);
};

export default forgotPasswordAPI;
