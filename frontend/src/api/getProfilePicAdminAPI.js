import axios from "axios";
import config from "../config/config";

const getProfilePicAdminAPI = async (data) => {
	const { token, doctor_id } = data;
	console.log(data);
	return await axios
		.get(
			config.baseUrl + config.getProfilePicAdmin + "?doctor_id=" + doctor_id,
			{
				headers: { Authorization: "Bearer " + token },
			}
		)
		.then((res) => {
			//console.log(res);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};
export default getProfilePicAdminAPI;
