import dbg from "debug";
const debug = dbg("service:newAppointment");
import checkToken from "../controllers/checkToken";
import getSchedule from "../data/getSchedule";
import getFutureAppointments from "../data/getFutureAppointments";
import getFuturePatientAppointments from "../data/getFuturePatientAppointments";
import getDoctorDuration from "../data/getDoctorDuration";
import getAppointmentTime from "../controllers/getAppointmentTime";
import setAppointment from "../data/setAppointment";
import getAppointmentUsers from "../data/getAppointmentUsers";
import getUserEmail from "../data/getUserEmail";
import moment from "moment";
import sendMail from "../controllers/sendMail";
import appointmentDetailsText from "../controllers/appointmentDetailsText";
const newAppointmentService = async (
	token,
	{ doctor_id, preferred_date, case_id, patient_id }
) => {
	var schedule;
	var docappointment;
	var patappointment;
	var duration;
	var pd = preferred_date;
	if (pd == null || moment(pd) < moment()) {
		pd = moment().add(5, "minutes").format("YYYY-MM-DD HH:mm");
	}
	var resp, patient_email, doctor_email, appointment_details;
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
			//debug(pd);
			return getSchedule(doctor_id, pd);
		})
		.then((response) => {
			// debug(response);
			schedule = response.data.schedule;
			// debug(schedule);
			return getFutureAppointments(doctor_id, pd);
		})
		.then((response) => {
			docappointment = response.data.appointment;
			// debug(docappointment);
			return getFuturePatientAppointments(patient_id, pd);
		})
		.then((response) => {
			patappointment = response.data.appointment;
			// debug(patappointment);
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
			// debug(response);
			return setAppointment(case_id, preferred_date, doctor_id, response);
		})
		.then((response) => {
			resp = response;
			return getAppointmentUsers(response.data.appointment_id);
		})
		.then((response) => {
			appointment_details = response.data.appointment_details;
			return getUserEmail([
				{ user_id: appointment_details.doctor_id, type: "doctor" },
			]);
		})
		.then((response) => {
			doctor_email = response.data.emails[0];
			return getUserEmail([
				{ user_id: appointment_details.patient_id, type: "patient" },
			]);
		})
		.then((response) => {
			patient_email = response.data.emails[0];
			var txtp, txtd;
			if (appointment_details.start_time) {
				txtd =
					"Appointment with Patient " +
					appointment_details.patient_name +
					"\n" +
					"Confirmed" +
					"\n";
				txtp =
					"Appointment with Doctor " +
					appointment_details.doctor_name +
					"\n" +
					"Confirmed" +
					"\n";
			} else {
				txtd =
					"Appointment with Patient " +
					appointment_details.patient_name +
					"\n" +
					"Is in pending state" +
					"\n";
				txtp =
					"Appointment with Doctor " +
					appointment_details.doctor_name +
					"\n" +
					"Is in pending state" +
					"\n";
			}
			txtp += appointmentDetailsText(appointment_details);
			txtd += appointmentDetailsText(appointment_details);
			sendMail({
				to: doctor_email,
				subject: "Appointment Acknowledgement",
				text: txtd,
			});

			sendMail({
				to: patient_email,
				subject: "Appointment Acknowledgement",
				text: txtp,
			});
			return resp;
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default newAppointmentService;
