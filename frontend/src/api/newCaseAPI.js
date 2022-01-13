import axios from "axios";
import config from "../config/config";

const newCaseAPI = async (data) => {
	const { token, case_description } = data;

	return await axios
		.post(
			config.baseUrl + config.newCase,
			{
				case_description: case_description,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
		.then((res) => {
			return res.data;
		})
		.catch();
};

export default newCaseAPI;
