import axios from "axios";
import config from "../../config/config";
const addAvailabilityAPI = async (data) => {
	const { token, doctor_id, start_time, end_time } = data;
	return await axios
		.post(
			config.baseUrl + config.admin + config.addAvailability,
			{ doctor_id: doctor_id, start_time: start_time, end_time: end_time },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
export default addAvailabilityAPI;
