import dbg from "debug";
const debug = dbg("service:getPatientAppointments");
import checkToken from "../controllers/checkToken";
import getPatientAppointments from "../data/getPatientAppointments";
const getPatientAppointmentsService = async ({ token, case_id }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "patient") {
				return response.data.decoded;
			} else {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
		})
		.then((decoded) => {
			return getPatientAppointments(case_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default getPatientAppointmentsService;
