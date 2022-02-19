import dbg from "debug";
const debug = dbg("service:getAllPatientAppointments");
import checkToken from "../controllers/checkToken";
import getAllPatientAppointments from "../data/getAllPatientAppointments";
const getAllPatientAppointmentsService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "patient") {
				return response.data.decoded;
			} else {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
		})
		.then((decoded) => {
			return getAllPatientAppointments(decoded.user_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default getAllPatientAppointmentsService;
