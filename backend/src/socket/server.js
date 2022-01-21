import dbg from "debug";
const debug = dbg("socket:server");
const users = [];
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

		socket.emit("yourID", socket.id);
		io.sockets.emit("allUsers", users);
		socket.on("disconnect", () => {
			//delete users[socket.id];
			removeUser(users, socket);
			//debug(users);
		});
		socket.on("getRoom", (data) => {
			findInAppointment(
				data.token,
				data.appointment_id,
				data.socketId,
				currentAppointments
			).then((response) => {
				debug(response);
				debug(currentAppointments);
				socket.emit("roomStatus", response);
			});
		});
		socket.on("callUser", (data) => {
			io.to(data.userToCall).emit("hey", {
				signal: data.signalData,
				from: data.from,
			});
		});

		socket.on("acceptCall", (data) => {
			io.to(data.to).emit("callAccepted", data.signal);
		});
	});
};
export default socketServer;
