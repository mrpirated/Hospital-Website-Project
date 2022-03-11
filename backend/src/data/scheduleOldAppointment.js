import dbg from "debug";
const debug = dbg("data:scheduleOldAppointment");
import getSchedule from "./getSchedule";
import getFutureAppointments from "./getFutureAppointments";
import getDoctorDuration from "./getDoctorDuration";
import getAppointmentTime from "../controllers/getAppointmentTime";
import setAppointmentTime from "./setAppointmentTime";
import getFuturePatientAppointments from "./getFuturePatientAppointments";
import getAppointmentUsers from "./getAppointmentUsers";
import getUserEmail from "./getUserEmail";
import sendMail from "../controllers/sendMail";
import appointmentDetailsText from "../controllers/appointmentDetailsText";
import moment from "moment";
const scheduleAppointment = async (doctor_id, app) => {
	var schedule;
	var docappointment;
	var patappointment;
	var duration;
	var pd = app.preferred_date;
	var resp, patient_email, doctor_email, appointment_details;
	if (pd == null || new Date(pd) < new Date()) {
		pd = moment().add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
	}
	return await getSchedule(doctor_id, pd)
		.then((response) => {
			schedule = response.data.schedule;
			return getFutureAppointments(doctor_id, pd);
		})
		.then((response) => {
			docappointment = response.data.appointment;
			//debug(appointment);
			return getFuturePatientAppointments(app.patient_id, pd);
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
			if (response.success) {
				return setAppointmentTime(
					response.data.appointment_time,
					app.appointment_id
				);
			} else return response;
		})
		.then((response) => {
			if (response.success) {
				resp = response;
				return getAppointmentUsers(app.appointment_id);
			} else return response;
		})
		.then((response) => {
			if (response.success) {
				appointment_details = response.data.appointment_details;
				return getUserEmail([
					{ user_id: appointment_details.doctor_id, type: "doctor" },
				]);
			} else return response;
		})
		.then((response) => {
			if (response.success) {
				doctor_email = response.data.emails[0];
				return getUserEmail([
					{ user_id: appointment_details.patient_id, type: "patient" },
				]);
			} else return response;
		})
		.then((response) => {
			if (response.success) {
				patient_email = response.data.emails[0];
				var txtp, txtd;
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
			} else return response;
		})
		.catch((err) => {
			return err;
		});
};
function processArray(doctor_id, array, fn) {
	var results = [];
	return array.reduce(function (p, item) {
		return p.then(function () {
			return fn(doctor_id, item).then(function (data) {
				results.push(data);
				return results;
			});
		});
	}, Promise.resolve());
}
const scheduleOldAppointment = (doctor_id, oldaps) => {
	return new Promise((resolve, reject) => {
		debug(doctor_id);
		debug(oldaps);
		processArray(doctor_id, oldaps, scheduleAppointment)
			.then((response) => {
				debug(response);
				resolve({
					success: true,
					message: "Availability set successfully with added appointments",
					data: response,
				});
			})
			.catch((err) => {
				reject({ success: false, message: err });
			});
	});
};
export default scheduleOldAppointment;
