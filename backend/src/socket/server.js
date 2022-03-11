import dbg from "debug";
import addUser from "./helpers/addUser";
import removeUser from "./helpers/removeUser";
import findInAppointment from "./helpers/findInAppointments";
import addAppointments from "./helpers/addAppointments";
import removeAppointments from "./helpers/removeAppointments";
import onStartAppointments from "./helpers/onStartAppointments";
import findUserAppointments from "./helpers/findUserAppointments";
import getMultipleAppointments from "../data/getMultipleAppointments";
const debug = dbg("socket:server");
const users = [];
const currentAppointments = [
	// {
	// 	appointment_id: 35,
	// 	patient_id: 1,
	// 	doctor_id: 1,
	// 	patient_socketId: null,
	// 	doctor_socketId: null,
	// },
];
debug("appointments added initially");
onStartAppointments(currentAppointments).then(() => {
	debug(currentAppointments);
});
setInterval(() => {
	debug("appointments added and removed");
	addAppointments(currentAppointments).then(() => {
		debug(currentAppointments);
	});
	removeAppointments(currentAppointments).then(() => {
		debug(currentAppointments);
	});
}, 1000 * 60);
const socketServer = (io) => {
	io.on("connection", async (socket) => {
		debug("a user connected! ID :- " + socket.id);

		await addUser(socket.handshake.query.token, users, socket).catch((err) => {
			debug(err);
		});

		socket.emit("yourID", socket.id);

		socket.on("disconnect", () => {
			removeUser(users, currentAppointments, socket).then((response) => {
				debug(response);
				if (response.success) {
					io.to(response.data.peerSocketId).emit("peerDisconnected");
				}
			});
			//debug(users);
		});
		socket.on("getRoom", (data) => {
			debug("getRoom");
			debug(data);
			findInAppointment(
				data.token,
				data.appointment_id,
				data.socketId,
				currentAppointments
			).then((response) => {
				//debug(response);
				debug(currentAppointments);
				socket.emit("roomStatus", response);
			});
		});
		socket.on("getAppointments", (data) => {
			debug("getAppointments");
			findUserAppointments(data.token, currentAppointments)
				.then((response) => {
					debug(response.data);
					if (response.data.appointments.length == 0) {
						return {
							success: true,
							message: "Appointments Found Successfully",
							data: { appointments: [] },
						};
					} else return getMultipleAppointments(response.data.appointments);
				})
				.then((response) => {
					//debug(response.data);
					socket.emit("appointments", response);
				})
				.catch((err) => {
					debug(err);
				});
		});
		socket.on("callPeer", (data) => {
			debug("callPeer");
			// debug(data);
			io.to(data.userToCall).emit("peerCalling", {
				signal: data.signalData,
				from: data.from,
			});
		});
		socket.on("callPatient", (data) => {
			debug("callPatient");
			// debug(data);
			io.to(data.userToCall).emit("doctorCalling", {
				signal: data.signalData,
				from: data.from,
			});
		});
		socket.on("peerAccept", (data) => {
			debug("peerAccept");
			// debug(data);
			io.to(data.to).emit("peerHere", data.signal);
		});
		socket.on("patientAccept", (data) => {
			debug("patientAccept");
			// debug(data);
			io.to(data.to).emit("patientHere", data.signal);
		});
	});
};
export default socketServer;
