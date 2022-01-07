import dbg from "debug";
const debug = dbg("service:newAppointment");
import checkToken from "../controllers/checkToken";
import getSchedule from "../data/getSchedule";
import getFutureAppointments from "../data/getFutureAppointments";
import getDoctorDuration from "../data/getDoctorDuration";
import getAvailableTime from "../controllers/getAppointmentTime";
import setAppointment from "../data/setAppointment";

const newAppointmentService = async ({
	token,
	doctor_id,
	preferred_date,
	case_id,
}) => {
	var schedule;
	var appointment;
	var duration;
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
			var pd = preferred_date;
			if (new Date(pd) < new Date()) {
				pd = new Date().toISOString();
			}
			debug(pd);
			return getSchedule(doctor_id, pd);
		})
		.then((response) => {
			//debug(response);
			schedule = response.data.schedule;
			debug(schedule);
			return getFutureAppointments(doctor_id, preferred_date);
		})
		.then((response) => {
			appointment = response.data.appointment;
			//debug(appointment);
			return getDoctorDuration(doctor_id);
		})
		.then((response) => {
			//debug(response);
			duration = response.data.duration;
			return getAvailableTime(schedule, appointment, duration * 60 * 1000);
		})
		.then((response) => {
			return setAppointment(case_id, preferred_date, doctor_id, response);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default newAppointmentService;
