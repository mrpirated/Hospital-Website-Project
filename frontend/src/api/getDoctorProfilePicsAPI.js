import axios from "axios";
import config from "../config/config";

const getDoctorProfilePicsAPI = async (data) => {
	const { token } = data;
	return await axios
		.get(config.baseUrl + config.getDoctorProfilePics, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};

export default getDoctorProfilePicsAPI;
