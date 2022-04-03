import axios from "axios";
import config from "../../config/config";

const getPatientsAPI = async (data) => {
	const { token } = data;
	return await axios
		.get(config.baseUrl + config.admin + config.getPatients, {
			headers: { Authorization: "Bearer " + token },
		})
		.then((res) => {
			return res.data;
		});
};
export default getPatientsAPI;
