import axios from "axios";
import config from "../../config/config";
const addUserDetailsAPI = async (data) => {
	const {
		token,
		first_name,
		last_name,
		dob,
		gender,
		address,
		email,
		user_id,
		type,
	} = data;
	return await axios
		.post(
			config.baseUrl + config.admin + config.addUserDetails,
			{ first_name, last_name, dob, gender, address, email, user_id, type },
			{ headers: { Authorization: "Bearer " + token } }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
export default addUserDetailsAPI;
