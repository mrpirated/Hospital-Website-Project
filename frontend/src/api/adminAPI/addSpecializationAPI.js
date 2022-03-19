import axios from "axios";
import config from "../../config/config";
const addSpecializationAPI = async (data) => {
	const { token, specialization, doctor_id } = data;
	return await axios
		.post(
			config.baseUrl + config.admin + config.addSpecialization,
			{ specialization: specialization, doctor_id: doctor_id },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
export default addSpecializationAPI;
