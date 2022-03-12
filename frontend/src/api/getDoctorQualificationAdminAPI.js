import axios from "axios";
import config from "../config/config";

const getDoctorQualificationAdminAPI = async (data) => {
	const { token, doctor_id } = data;
	return await axios
		.get(
			config.baseUrl +
				config.getDoctorQualificationAdmin +
				"?doctor_id=" +
				doctor_id,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};

export default getDoctorQualificationAdminAPI;
