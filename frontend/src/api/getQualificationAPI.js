import axios from "axios";
import config from "../config/config";

const getQualificationAPI = async (data) => {
	const { token } = data;
	// console.log(config.baseUrl + config.getQualification +
	//     "?" +
	//     "token=" +
	//     token);
	return await axios
		.get(config.baseUrl + config.getQualification, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
		.then((res) => {
			//console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};

export default getQualificationAPI;
