import axios from "axios";
import config from "../config/config";

const getDoctorDaySlotsAPI = async (data) => {
	const { token, doctor_id, date } = data;
	return await axios
		.get(
			config.baseUrl +
				config.getDoctorDaySlots +
				"?doctor_id=" +
				doctor_id +
				"&date=" +
				date,
			{
				headers: { Authorization: "Bearer " + token },
			}
		)
		.then((res) => {
			return res.data;
		});
};
export default getDoctorDaySlotsAPI;
