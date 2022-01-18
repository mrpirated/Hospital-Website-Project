import dbg from "debug";
const debug = dbg("data:scheduleOldAppointment");
import getSchedule from "./getSchedule";
import getFutureAppointments from "./getFutureAppointments";
import getDoctorDuration from "./getDoctorDuration";
import getAppointmentTime from "../controllers/getAppointmentTime";
import setAppointmentTime from "../data/setAppointmentTime";
const scheduleAppointment = async (doctor_id, app) => {
	var schedule;
	var appointment;
	var duration;
	var pd = app.preferred_date;
	if (pd == null || new Date(pd) < new Date()) {
		pd = new Date().toISOString();
	}
	return await getSchedule(doctor_id, pd)
		.then((response) => {
			schedule = response.data.schedule;
			return getFutureAppointments(doctor_id, pd);
		})
		.then((response) => {
			appointment = response.data.appointment;
			return getDoctorDuration(doctor_id);
		})
		.then((response) => {
			//debug(response);
			duration = response.data.duration;
			return getAppointmentTime(schedule, appointment, duration * 60 * 1000);
		})
		.then((response) => {
			if (response.success) {
				return setAppointmentTime(
					response.data.appointment_time,
					app.appointment_id
				);
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
