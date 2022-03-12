import axios from "axios";
import config from "../config/config";
const removeDoctorQualificationAdminAPI = async (data) => {
	const { token, qualification_id, doctor_id } = data;
	return await axios
		.post(
			config.baseUrl + config.removeDoctorQualificationAdmin,
			{ qualification_id: qualification_id, doctor_id: doctor_id },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
export default removeDoctorQualificationAdminAPI;
