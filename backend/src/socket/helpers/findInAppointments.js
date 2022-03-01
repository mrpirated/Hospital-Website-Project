import dbg from "debug";
const debug = dbg("socket:findInAppointment");
import checkToken from "../../controllers/checkToken";

const findInAppointment = async (
	token,
	appId,
	socketId,
	currentAppointments
) => {
	return await checkToken(token)
		.then((response) => {
			var theapp;
			if (response.data.decoded.type === "patient") {
				theapp = currentAppointments.find(
					(app) =>
						app.appointment_id === appId &&
						app.patient_id === response.data.decoded.user_id
				);
				debug(theapp);
				if (theapp && theapp.patient_socketId == null) {
					theapp.patient_socketId = socketId;
					currentAppointments.find(
						(app) =>
							app.appointment_id === appId &&
							app.patient_id === response.data.decoded.user_id
					).patient_socketId = socketId;
				} else if (theapp && theapp.patient_socketId !== socketId) {
					return {
						success: false,
						message: "Patient already in call",
					};
				}
				//debug(theapp);
			} else if (response.data.decoded.type === "doctor") {
				theapp = currentAppointments.find(
					(app) =>
						app.appointment_id === appId &&
						app.doctor_id === response.data.decoded.user_id
				);
				if (theapp && theapp.doctor_socketId == null) {
					theapp.doctor_socketId = socketId;
					currentAppointments.find(
						(app) =>
							app.appointment_id === appId &&
							app.doctor_id === response.data.decoded.user_id
					).doctor_socketId = socketId;
				} else if (theapp && theapp.doctor_socketId !== socketId) {
					return {
						success: false,
						message: "Doctor already in call",
					};
				}
			}

			if (theapp) {
				return {
					success: true,
					message: "Found Appointment",
					data: { appointment: theapp },
				};
			} else {
				return { success: false, message: "no appointment" };
			}
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default findInAppointment;
