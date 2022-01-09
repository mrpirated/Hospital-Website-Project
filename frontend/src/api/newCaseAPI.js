import axios from "axios";
import config from "../config/config";

const newCaseAPI = async (data) => {
	const { token, case_description } = data;

	return await axios
		.post(config.baseUrl + config.newCase, {
			token: token,
			case_description: case_description,
		})
		.then((res) => {
			return res.data;
		})
		.catch();
};

export default newCaseAPI;
