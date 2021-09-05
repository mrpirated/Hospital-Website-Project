import axios from "axios";
import store from "../store/configureStore";
import config from "../config/config.json";
import { loggedIn } from "../store/auth";

const loginAPI = (data) => {
	const { email, password } = data;
	axios
		.post(config.baseUrl + config.login, {
			email: email,
			password: password,
		})
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data);
				store.dispatch(
					loggedIn({
						user: res.data.user,
						token: res.data.token,
					})
				);
			}
		})
		.catch();
};
export default loginAPI;
