import axios from "axios";
import config from "../config/config";

const newAppointmentAPI = async (data) => {
	const { token, case_id, doctor_id, slot_id, preferred_date } = data;

	return await axios
		.post(
			config.baseUrl + config.newAppointmentSlot,
			{
				case_id: case_id,
				doctor_id: doctor_id,
				preferred_date: preferred_date,
				slot_id: slot_id,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
		.then((res) => {
			return res.data;
		})
		.catch();
};

export default newAppointmentAPI;
