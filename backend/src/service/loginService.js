import dbg from "debug";
const debug = dbg("service:login");
import checkIfUserExists from "../data/checkIfUserExists";
import checkPassword from "../controllers/checkPassword";
import getToken from "../controllers/getToken";
import config from "../config";
const loginService = async ({ type, email, password }) => {
	//debug(config);
	var user_id;
	var userDetails;
	return await checkIfUserExists({ type, email })
		.then((response) => {
			//debug(type, email, password);
			//debug(response);
			if (response.success) {
				return response;
			}
			return Promise.reject({
				success: false,
				message: "User Dosen't exists",
			});
		})
		.then((response) => {
			//debug(user);

			if (type == "patient") user_id = response.data.user.patient_id;
			else if (type == "doctor") user_id = response.data.user.doctor_id;
			else if (type == "admin") user_id = response.data.user.admin_id;
			userDetails = (({
				patient_id,
				doctor_id,
				admin_id,
				first_name,
				last_name,
				dob,
				gender,
				address,
				email,
				phone,
				email_verified,
			}) => ({
				patient_id,
				doctor_id,
				admin_id,
				first_name,
				last_name,
				dob,
				gender,
				address,
				email,
				phone,
				email_verified,
			}))(response.data.user);
			return {
				user_password: password,
				password: response.data.user.password,
				// user_id: user_id,
				// type: type,
				// user: (({
				// 	patient_id,
				// 	doctor_id,
				// 	admin_id,
				// 	first_name,
				// 	last_name,
				// 	dob,
				// 	gender,
				// 	address,
				// 	email,
				// 	phone,
				// }) => ({
				// 	patient_id,
				// 	doctor_id,
				// 	admin_id,
				// 	first_name,
				// 	last_name,
				// 	dob,
				// 	gender,
				// 	address,
				// 	email,
				// 	phone,
				// }))(user),
			};
		})
		.then((details) => {
			return checkPassword(details);
		})
		.then((response) => {
			//debug(response);
			const token = getToken({ user_id: user_id, type: type }, "30d");
			return {
				success: true,
				message: "Successfully logged In",
				data: { token, user: userDetails },
			};
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default loginService;
