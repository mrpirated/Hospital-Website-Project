import dbg from "debug";
const debug = dbg("socket:server");
const users = [];
const users1 = {};
const currentAppointments = [
	{
		appointment_id: 4,
		patient_id: 1,
		doctor_id: 1,
		patient_socketId: null,
		doctor_socketId: null,
	},
];
import addUser from "./helpers/addUser";
import removeUser from "./helpers/removeUser";
import findInAppointment from "./helpers/findInAppointments";
const socketServer = (io) => {
	io.on("connection", async (socket) => {
		debug("a user connected! ID :- " + socket.id);

		await addUser(socket.handshake.query.token, users, socket).catch((err) => {
			debug(err);
		});
		if (!users1[socket.id]) {
			users1[socket.id] = socket.id;
		}
		socket.emit("yourID", socket.id);
		io.sockets.emit("allUsers", users1);
		socket.on("disconnect", () => {
			delete users1[socket.id];
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
			debug(data);
			io.to(data.userToCall).emit("patientCalling", {
				signal: data.signalData,
				from: data.from,
			});
		});
		socket.on("callPatient", (data) => {
			debug("callPatient");
			debug(data);
			io.to(data.userToCall).emit("doctorCalling", {
				signal: data.signalData,
				from: data.from,
			});
		});
		socket.on("doctorAccept", (data) => {
			debug("doctorAccept");
			debug(data);
			io.to(data.to).emit("doctorHere", data.signal);
		});
		socket.on("patientAccept", (data) => {
			debug("patientAccept");
			debug(data);
			io.to(data.to).emit("patientHere", data.signal);
		});

		socket.on("callUser", (data) => {
			debug("callUser");
			debug(data);
			io.to(data.userToCall).emit("hey", {
				signal: data.signalData,
				from: data.from,
			});
		});

		socket.on("acceptCall", (data) => {
			debug("acceptCall");
			debug(data);
			io.to(data.to).emit("callAccepted", data.signal);
		});
	});
};
export default socketServer;
