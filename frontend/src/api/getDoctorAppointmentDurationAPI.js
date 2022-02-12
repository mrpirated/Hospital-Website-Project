import axios from "axios";
import config from "../config/config";

const getDoctorAppointmentDuration = async (data) => {
	const { token } = data;
	return await axios
		.get(config.baseUrl + config.getDoctorAppointmentDuration, {
			headers: { Authorization: "Bearer " + token },
		})
		.then((res) => {
			return res.data;
		});
};
export default getDoctorAppointmentDuration;
