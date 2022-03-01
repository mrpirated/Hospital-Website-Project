import dbg from "debug";
const debug = dbg("socket:removeUser");
import findUserBySocketId from "./findUserBySocketId";
const removeUser = (users, currentAppointments, socket) => {
	debug("user disconnected " + socket.id);
	return findUserBySocketId(users, socket.id)
		.then((response) => {
			if (response.success) {
				users.splice(users.indexOf(response.data.user), 1);
				var theapp = currentAppointments.find(
					(app) => app.doctor_socketId === socket.id
				);
				if (theapp) {
					currentAppointments.find(
						(app) => app.doctor_socketId === socket.id
					).doctor_socketId = null;
					if (theapp.patient_socketId !== null) {
						return {
							success: true,
							data: { peerSocketId: theapp.patient_socketId },
						};
					} else return { success: false };
				}
				theapp = currentAppointments.find(
					(app) => app.patient_socketId === socket.id
				);
				if (theapp) {
					currentAppointments.find(
						(app) => app.patient_socketId === socket.id
					).patient_socketId = null;
					if (theapp.doctor_socketId !== null) {
						return {
							success: true,
							data: { peerSocketId: theapp.doctor_socketId },
						};
					} else return { success: false };
				}
			}
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default removeUser;
