import axios from "axios";
import config from "../../config/config";

const uploadProfilePicAPI = async (data) => {
	return await axios
		.post(
			config.baseUrl + config.admin + config.profilePicUpload,
			data.formdata,
			{
				headers: {
					Authorization: "Bearer " + data.token,
					"Content-Type": "multipart/form-data",
					doctor_id: data.doctor_id,
				},
			}
		)
		.then((res) => {
			console.log(res.data);
			return res.data;
		});
};
export default uploadProfilePicAPI;
