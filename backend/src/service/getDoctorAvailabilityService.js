import dbg from "debug";
const debug = dbg("service:getDoctorAvailability");
import checkToken from "../controllers/checkToken";
import getDoctorAvailability from "../data/getDoctorAvailability";
const getDoctorAvailabilityService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "doctor") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return response.data.decoded;
		})
		.then((decoded) => {
			return getDoctorAvailability(decoded.user_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default getDoctorAvailabilityService;
