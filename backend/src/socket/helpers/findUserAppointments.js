import dbg from "debug";
const debug = dbg("socket:findUserAppointments");
import checkToken from "../../controllers/checkToken";
const findUserAppointments = async (token, currentAppointments) => {
	return await checkToken(token)
		.then((response) => {
			var apps;
			if (response.data.decoded.type === "patient") {
				apps = currentAppointments.filter(
					(app) => app.patient_id === response.data.decoded.user_id
				);
			} else if (response.data.decoded.type === "doctor") {
				apps = currentAppointments.filter(
					(app) => app.doctor_id === response.data.decoded.user_id
				);
			}
			//debug(apps);
			return {
				success: true,
				data: {
					appointments: apps.map((app) => app.appointment_id),
				},
			};
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default findUserAppointments;
