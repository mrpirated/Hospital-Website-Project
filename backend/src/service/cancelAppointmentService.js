import dbg from "debug";
const debug = dbg("service:cancelAppointment");
import checkToken from "../controllers/checkToken";
import appointmentValidity from "../data/appointmentValidity";
import cancelAppointment from "../data/cancelAppointment";
const cancelAppointmentService = async (token, { appointment_id }) => {
	return await checkToken(token)
		.then((response) => {
			return appointmentValidity(
				response.data.decoded.type,
				response.data.decoded.user_id,
				appointment_id
			);
		})
		.then((response) => {
			if (response.success) {
				return cancelAppointment(appointment_id);
			}
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default cancelAppointmentService;
