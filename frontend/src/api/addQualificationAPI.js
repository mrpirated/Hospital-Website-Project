import axios from "axios";
import config from "../config/config";
const addQualificationAPI = async (data) => {
	const { token, qualification } = data;
	return await axios
		.post(
			config.baseUrl + config.addQualification,
			{ qualification: qualification },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
export default addQualificationAPI;
