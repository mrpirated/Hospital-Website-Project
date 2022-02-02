import axios from "axios";
import config from "../config/config";

const getDoctorAvailabilityAPI = async (data) => {
	const { token } = data;
	return await axios
		.get(config.baseUrl + config.getDoctorAvailability, {
			headers: { Authorization: "Bearer " + token },
		})
		.then((res) => {
			return res.data;
		});
};
export default getDoctorAvailabilityAPI;
