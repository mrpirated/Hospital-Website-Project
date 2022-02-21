import dbg from "debug";
const debug = dbg("service:rescheduleAppointment");
import checkToken from "../controllers/checkToken";
import appointmentValidity from "../data/appointmentValidity";
import setPreferredDate from "../data/setPreferredDate";
import getSchedule from "../data/getSchedule";
import getFutureAppointments from "../data/getFutureAppointments";
import getFuturePatientAppointments from "../data/getFuturePatientAppointments";
import getDoctorDuration from "../data/getDoctorDuration";
import getAppointmentTime from "../controllers/getAppointmentTime";
import updateAppointmentTime from "../data/updateAppointmentTime";
import resetAppointmentTime from "../data/resetAppointmentTime";
import moment from "moment";
const rescheduleAppointmentService = async (
	token,
	{ appointment_id, preferred_date }
) => {
	var doctor_id, case_id, patient_id;
	var schedule;
	var docappointment;
	var patappointment;
	var duration;
	var pd = preferred_date;
	if (pd == null || new Date(pd) < new Date()) {
		pd = moment().add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
	}
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
				doctor_id = response.data.appointment.doctor_id;
				case_id = response.data.appointment.case_id;
				patient_id = response.data.appointment.patient_id;
				return setPreferredDate(appointment_id, preferred_date);
			}
		})
		.then((response) => {
			debug(response.message);
			return resetAppointmentTime(appointment_id);
		})
		.then((response) => {
			debug(pd);
			debug(response.message);
			return getSchedule(doctor_id, pd);
		})
		.then((response) => {
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
			return updateAppointmentTime(appointment_id, response);
		})

		.catch((err) => {
			debug(err);
			return err;
		});
};

export default rescheduleAppointmentService;
