import axios from "axios";
import config from "../config/config";

const newAppointmentAPI = async (data) => {
	const { token, case_id, doctor_id, preferred_date, patient_id } = data;

	return await axios
		.post(
			config.baseUrl + config.newAppointment,
			{
				case_id: case_id,
				doctor_id: doctor_id,
				preferred_date: preferred_date,
				patient_id: patient_id,
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
