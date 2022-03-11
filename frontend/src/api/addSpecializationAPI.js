import axios from "axios";
import config from "../config/config";
const addSpecializationAPI = async (data) => {
	const { token, specialization } = data;
	return await axios
		.post(
			config.baseUrl + config.addSpecialization,
			{ specialization: specialization },
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
