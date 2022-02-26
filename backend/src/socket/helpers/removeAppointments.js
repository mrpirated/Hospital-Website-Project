import dbg from "debug";
const debug = dbg("socket:removeAppointments");
const removeAppointments = (currentAppointments) => {
	return new Promise((resolve, reject) => {
		for (var i = 0; i < currentAppointments.length; i++) {
			if (new Date(currentAppointments[i].end_time) < new Date()) {
				currentAppointments.splice(i, 1);
			}
		}
	});
};
export default removeAppointments;
