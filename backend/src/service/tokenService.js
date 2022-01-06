import checkToken from "../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:token");
import getUser from "../data/getUser";
const tokenService = async (token) => {
	debug(token);
	return await checkToken(token)
		.then((response) => {
			debug(response);
			if (response.success) {
				return Promise.resolve(response.data.decoded);
			} else {
				return Promise.reject(response);
			}
		})
		.then((decoded) => {
			debug(decoded);
			return getUser(decoded);
		})
		.then(
			({
				success,
				message,
				data: {
					type,
					user: {
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
					},
				},
			}) => ({
				success,
				message,
				data: {
					type,
					user: {
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
					},
				},
			})
		)
		.catch((err) => {
			return err;
		});
};
export default tokenService;
