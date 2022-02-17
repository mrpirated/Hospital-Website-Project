import axios from "axios";
import config from "../config/config";

const cancelAppointmentAPI = async (data) => {
	const { token, appointment_id } = data;
	return await axios
		.post(
			config.baseUrl + config.cancelAppointment,
			{ appointment_id },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export default cancelAppointmentAPI;
