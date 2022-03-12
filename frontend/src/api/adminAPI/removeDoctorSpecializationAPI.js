import axios from "axios";
import config from "../../config/config";
const removeDoctorSpecializationAPI = async (data) => {
	const { token, specialization_id, doctor_id } = data;
	return await axios
		.post(
			config.baseUrl + config.admin + config.removeDoctorSpecialization,
			{ specialization_id: specialization_id, doctor_id: doctor_id },
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
