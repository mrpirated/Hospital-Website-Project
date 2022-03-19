import axios from "axios";
import config from "../../config/config";

const getDoctorAppointmentDurationAPI = async (data) => {
	const { token, doctor_id } = data;
	return await axios
		.get(
			config.baseUrl +
				config.admin +
				config.getDoctorAppointmentDuration +
				"?doctor_id=" +
				doctor_id,
			{
				headers: { Authorization: "Bearer " + token },
			}
		)
		.then((res) => {
			return res.data;
		});
};
export default getDoctorAppointmentDurationAPI;
