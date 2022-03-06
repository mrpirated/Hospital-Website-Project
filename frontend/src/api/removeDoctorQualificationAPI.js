import axios from "axios";
import config from "../config/config";
const removeDoctorQualificationAPI = async (data) => {
	const { token, qualification_id } = data;
	return await axios
		.post(
			config.baseUrl + config.removeDoctorQualification,
			{ qualification_id: qualification_id },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
export default removeDoctorQualificationAPI;
