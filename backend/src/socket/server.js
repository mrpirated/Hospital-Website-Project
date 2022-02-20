import dbg from "debug";
const debug = dbg("socket:server");
const users = [];
const currentAppointments = [];
import addUser from "./helpers/addUser";
import removeUser from "./helpers/removeUser";
import findInAppointment from "./helpers/findInAppointments";
import addAppointments from "./helpers/addAppointments";
import removeAppointments from "./helpers/removeAppointments";
import onStartAppointments from "./helpers/onStartAppointments";
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
			removeUser(users, currentAppointments, socket);
			//debug(users);
		});
		socket.on("getRoom", (data) => {
			debug("getRoom");
			findInAppointment(
				data.token,
				data.appointment_id,
				data.socketId,
				currentAppointments
			).then((response) => {
				//debug(response);
				//debug(currentAppointments);
				socket.emit("roomStatus", response);
			});
		});
		socket.on("callDoctor", (data) => {
			debug("callDoctor");
			// debug(data);
			io.to(data.userToCall).emit("patientCalling", {
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
		socket.on("doctorAccept", (data) => {
			debug("doctorAccept");
			// debug(data);
			io.to(data.to).emit("doctorHere", data.signal);
		});
		socket.on("patientAccept", (data) => {
			debug("patientAccept");
			// debug(data);
			io.to(data.to).emit("patientHere", data.signal);
		});

		socket.on("callUser", (data) => {
			debug("callUser");
			// debug(data);
			io.to(data.userToCall).emit("hey", {
				signal: data.signalData,
				from: data.from,
			});
		});

		socket.on("acceptCall", (data) => {
			debug("acceptCall");
			// debug(data);
			io.to(data.to).emit("callAccepted", data.signal);
		});
	});
};
export default socketServer;
