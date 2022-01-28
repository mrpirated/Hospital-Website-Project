import axios from "axios";
import config from "../config/config";

const doctorAppointmentsAPI = async (data) => {
	const { token } = data;
	//console.log(token);
	return await axios
		.get(config.baseUrl + config.getDoctorAppointments, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
		.then((res) => {
			return res.data;
		});
};
export default doctorAppointmentsAPI;
