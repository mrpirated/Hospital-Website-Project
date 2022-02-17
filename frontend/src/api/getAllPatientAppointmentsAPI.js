import axios from "axios";
import config from "../config/config";

const getAllPatientAppointmentsAPI = async (data) => {
	const { token } = data;
	return await axios
		.get(config.baseUrl + config.getAllPatientAppointments, {
			headers: { Authorization: "Bearer " + token },
		})
		.then((res) => {
			return res.data;
		});
};
export default getAllPatientAppointmentsAPI;
