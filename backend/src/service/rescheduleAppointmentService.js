import dbg from "debug";
const debug = dbg("service:rescheduleAppointment");
import checkToken from "../controllers/checkToken";
const rescheduleAppointmentService = async (token) => {
	return await checkToken(token)
		.then((response) => {})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default rescheduleAppointmentService;
