import dbg from "debug";
const debug = dbg("service:newAppointment");
import checkToken from "../controllers/checkToken";
import getSchedule from "../data/getSchedule";
import getFutureAppointments from "../data/getFutureAppointments";
import getFuturePatientAppointments from "../data/getFuturePatientAppointments";
import getDoctorDuration from "../data/getDoctorDuration";
import getAppointmentTime from "../controllers/getAppointmentTime";
import setAppointment from "../data/setAppointment";

const newAppointmentService = async (
	token,
	{ doctor_id, preferred_date, case_id, patient_id }
) => {
	var schedule;
	var docappointment;
	var patappointment;
	var duration;
	var pd = preferred_date;
	if (pd == null || new Date(pd) < new Date()) {
		pd = new Date().toISOString();
	}
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
			debug(pd);
			return getSchedule(doctor_id, pd);
		})
		.then((response) => {
			//debug(response);
			schedule = response.data.schedule;
			debug(schedule);
			return getFutureAppointments(doctor_id, pd);
		})
		.then((response) => {
			docappointment = response.data.appointment;
			//debug(appointment);
			return getFuturePatientAppointments(patient_id, pd);
		})
		.then((response) => {
			patappointment = response.data.appointment;
			return getDoctorDuration(doctor_id);
		})
		.then((response) => {
			//debug(response);
			duration = response.data.duration;
			return getAppointmentTime(
				schedule,
				docappointment,
				patappointment,
				duration * 60 * 1000
			);
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
