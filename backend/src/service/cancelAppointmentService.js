import dbg from "debug";
const debug = dbg("service:cancelAppointment");
import checkToken from "../controllers/checkToken";
import appointmentValidity from "../data/appointmentValidity";
import cancelAppointment from "../data/cancelAppointment";
import getUserEmail from "../data/getUserEmail";
import sendMail from "../controllers/sendMail";
import getAppointmentUsers from "../data/getAppointmentUsers";
import moment from "moment";
import appointmentDetailsText from "../controllers/appointmentDetailsText";
const cancelAppointmentService = async (token, { appointment_id }) => {
	var decoded;
	var resp;
	var doctor_email, patient_email;
	var appointment_details;
	return await checkToken(token)
		.then((response) => {
			decoded = response.data.decoded;
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
		.then((response) => {
			resp = response;
			return getAppointmentUsers(appointment_id);
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
			var txtd, txtp;
			if (decoded.type === "doctor") {
				txtd =
					"Appointment with Patient " +
					appointment_details.patient_name +
					"\n" +
					"was cancelled by you" +
					"\n";
				txtp =
					"Appointment with Doctor " +
					appointment_details.doctor_name +
					"\n" +
					"was cancelled by the Doctor" +
					"\n";
			} else if (decoded.type === "patient") {
				txtd =
					"Appointment with Patient " +
					appointment_details.patient_name +
					"\n" +
					"was cancelled by the Patient" +
					"\n";
				txtp =
					"Appointment with Doctor " +
					appointment_details.doctor_name +
					"\n" +
					"was cancelled by you" +
					"\n";
			}
			txtp += appointmentDetailsText(appointment_details);
			txtd += appointmentDetailsText(appointment_details);

			sendMail({
				to: doctor_email,
				subject: "Appointment Cancelled",
				text: txtd,
			});
			sendMail({
				to: patient_email,
				subject: "Appointment Cancelled",
				text: txtp,
			});
			return resp;
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default cancelAppointmentService;
