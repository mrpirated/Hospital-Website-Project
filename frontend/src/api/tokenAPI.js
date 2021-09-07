import axios from "axios";
import config from "../config/config.json";

const initialState = async (token) => {
	//console.log(token);
	const { user } = await axios
		.post(config.baseUrl + config.token, {
			token: token,
		})
		.then((res) => res.data)
		.catch();
	console.log(user);
	//console.log(patient_id);
	return user;
};
export default initialState;
