import dbg from "debug";
const debug = dbg("service:forgotPasswordService");
import checkToken from "../controllers/checkToken";
import getDoctorDuration from "../data/getDoctorDuration";
const getDoctorAppointmentDurationService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "doctor") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return getDoctorDuration(response.data.decoded.user_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};

export default getDoctorAppointmentDurationService;
