import axios from "axios";
import config from "../config/config";

const getDoctorDetailsAPI = async (data) => {
	const { token } = data;

	return await axios
		.get(config.baseUrl + config.patient + config.doctor_details, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
		.then((res) => {
			return res.data;
		});
};

export default getDoctorDetailsAPI;
