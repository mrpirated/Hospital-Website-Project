import axios from "axios";
import config from "../config/config";
const addQualificationAdminAPI = async (data) => {
	const { token, qualification, doctor_id } = data;
	return await axios
		.post(
			config.baseUrl + config.addQualificationAdmin,
			{ qualification: qualification, doctor_id: doctor_id },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
export default addQualificationAdminAPI;
