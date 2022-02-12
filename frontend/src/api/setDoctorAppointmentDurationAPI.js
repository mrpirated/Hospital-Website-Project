import axios from "axios";
import config from "../config/config";

const setDoctorAppointmentDurationAPI = async (data) => {
	const { token, duration } = data;
	return await axios
		.post(
			config.baseUrl + config.setDoctorAppointmentDuration,
			{ duration },
			{
				headers: { Authorization: "Bearer " + token },
			}
		)
		.then((res) => {
			return res.data;
		});
};
export default setDoctorAppointmentDurationAPI;
