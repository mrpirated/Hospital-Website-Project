import axios from "axios";
import config from "../config/config";

const getSpecializationAPI = async (data) => {
	const { token } = data;
	// console.log(config.baseUrl + config.getSpecialization +
	//     "?" +
	//     "token=" +
	//     token);
	return await axios
		.get(config.baseUrl + config.getSpecialization, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};

export default getSpecializationAPI;
