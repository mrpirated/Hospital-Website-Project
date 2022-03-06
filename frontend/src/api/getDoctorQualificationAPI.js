import axios from "axios";
import config from "../config/config";

const getDoctorQualificationAPI = async (data) => {
	const { token } = data;
	return await axios
		.get(config.baseUrl + config.getDoctorQualification, {
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

export default getDoctorQualificationAPI;
