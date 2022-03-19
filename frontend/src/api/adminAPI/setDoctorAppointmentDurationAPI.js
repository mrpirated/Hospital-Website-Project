import axios from "axios";
import config from "../../config/config";

const setDoctorAppointmentDurationAPI = async (data) => {
	const { token, duration, doctor_id } = data;
	return await axios
		.post(
			config.baseUrl + config.admin + config.setDoctorAppointmentDuration,
			{ duration, doctor_id },
			{
				headers: { Authorization: "Bearer " + token },
			}
		)
		.then((res) => {
			return res.data;
		});
};
export default setDoctorAppointmentDurationAPI;
