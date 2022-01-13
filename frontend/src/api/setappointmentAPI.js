import axios from "axios";
import config from "../config/config";

const setappointmentAPI = async (data) => {
	const { token, start_time, end_time, appointment_id } = data;
	return await axios
		.post(
			config.baseUrl + config.admin + config.appointment,
			{
				start_time: start_time,
				end_time: end_time,
				appointment_id: appointment_id,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
		.then((res) => {
			console.log(res.data);
			if ((res.status = 200)) {
				return {
					reply: true,
					msg: res.data,
				};
			} else
				return {
					reply: false,
					msg: "failed",
				};
		});
};
export default setappointmentAPI;
