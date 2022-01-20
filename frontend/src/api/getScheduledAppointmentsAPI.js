import axios from "axios";
import config from "../config/config";

const getScheduledAppointments = async (data) => {
	const { token } = data;
	return await axios
		.get(config.baseUrl + config.getScheduledAppointments, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
		.then((res) => {
			//console.log(res);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};
export default getScheduledAppointments;
