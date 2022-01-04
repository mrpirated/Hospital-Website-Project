import dbg from "debug";
const debug = dbg("service:newAppointment");
import checkToken from "../controllers/checkToken";
import getSchedule from "../data/getSchedule";
import getFutureAppointments from "../data/getFutureAppointments";
const newAppointmentService = async ({
	token,
	doctor_id,
	preferred_date,
	case_id,
}) => {
	var schedule;
	var appointment;
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "patient") {
				return response.data.decoded;
			} else {
				if (response.success) {
					return Promise.reject({ success: false, message: "Not Authorized" });
				} else return Promise.reject(response);
			}
		})
		.then((response) => {
			if (new Date(preferred_date) < new Date()) {
				preferred_date = new Date().toISOString();
			}
			debug(preferred_date);
			return getSchedule(doctor_id, preferred_date);
		})
		.then((response) => {
			//debug(response);
			schedule = response.data.schedule;
			debug(schedule);
			return getFutureAppointments(doctor_id, preferred_date);
		})
		.then((response) => {
			appointment = response.data.appointment;
			debug(appointment);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default newAppointmentService;
