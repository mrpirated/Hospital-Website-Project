import dbg from "debug";
const debug = dbg("service:getDoctorAppointments");
import checkToken from "../controllers/checkToken";
import getDoctorAppointments from "../data/getDoctorAppointments";
const getDoctorAppointmentsService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "doctor") {
				return response.data.decoded;
			} else {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
		})
		.then((decoded) => {
			return getDoctorAppointments(decoded.user_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default getDoctorAppointmentsService;
