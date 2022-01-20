import dbg from "debug";
const debug = dbg("service:getScheduledAppointments");
import checkToken from "../controllers/checkToken";
import getScheduledAppointments from "../data/getScheduledAppointments";
const getScheduledAppointmentsService = async (token) => {
	debug(token);
	return await checkToken(token)
		.then((response) => {
			return getScheduledAppointments(response.data.decoded);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default getScheduledAppointmentsService;
