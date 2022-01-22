import dbg from "debug";
const debug = dbg("socket:removeUser");
import findUserBySocketId from "./findUserBySocketId";
const removeUser = (users, currentAppointments, socket) => {
	debug("user disconnected " + socket.id);
	return findUserBySocketId(users, socket.id)
		.then((response) => {
			if (response.success) {
				users.splice(users.indexOf(response.data.user), 1);
				if (
					currentAppointments.find((app) => app.doctor_socketId === socket.id)
				)
					currentAppointments.find(
						(app) => app.doctor_socketId === socket.id
					).doctor_socketId = null;
				else if (
					currentAppointments.find((app) => app.patient_socketId === socket.id)
				)
					currentAppointments.find(
						(app) => app.patient_socketId === socket.id
					).patient_socketId = null;
			}
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default removeUser;
