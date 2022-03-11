import axios from "axios";
import config from "../config/config";
const removeDoctorSpecializationAPI = async (data) => {
	const { token, specialization_id } = data;
	return await axios
		.post(
			config.baseUrl + config.removeDoctorSpecialization,
			{ specialization_id: specialization_id },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
export default removeDoctorSpecializationAPI;
