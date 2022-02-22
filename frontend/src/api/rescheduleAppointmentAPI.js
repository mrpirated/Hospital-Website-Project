import axios from "axios";
import config from "../config/config";
const rescheduleAppointmentAPI = async (data) => {
	const { token, appointment_id, preferred_date } = data;
	return await axios
		.post(
			config.baseUrl + config.rescheduleAppointment,
			{ appointment_id, preferred_date },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
export default rescheduleAppointmentAPI;
