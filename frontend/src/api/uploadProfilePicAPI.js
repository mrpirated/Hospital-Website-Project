import axios from "axios";
import config from "../config/config";

const uploadProfilePicAPI = async (data) => {
	return await axios
		.post(config.baseUrl + config.profilePicUpload, data.formdata, {
			headers: {
				Authorization: "Bearer " + data.token,
				"Content-Type": "multipart/form-data",
			},
		})
		.then((res) => {
			console.log(res.data);
			return res.data;
		});
};
export default uploadProfilePicAPI;
