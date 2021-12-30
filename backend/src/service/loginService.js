import dbg from "debug";
const debug = dbg("service:login");
import checkIfUserExists from "../data/checkIfUserExists";
import { checkPassword } from "../controllers/loginController";
import config from "../config";
const loginService = async ({ type, email, password }) => {
	//debug(config);
	return await checkIfUserExists({ type, email })
		.then((response) => {
			//debug(type, email, password);
			//debug(response);
			if (response.length > 0) {
				return response[0];
			}
			return Promise.reject({
				success: false,
				message: "User Dosen't exists",
			});
		})
		.then((user) => {
			//debug(user);
			var user_id;
			if (type == "patient") user_id = user.patient_id;
			else if (type == "doctor") user_id = user.doctor_id;
			else if (type == "admin") user_id = user.admin_id;
			return {
				user_password: password,
				password: user.password,
				user_id: user_id,
				type: type,
			};
		})
		.then((details) => {
			return checkPassword(details);
		})
		.catch((err) => {
			//debug(err);
			return err;
		});
};
export default loginService;
