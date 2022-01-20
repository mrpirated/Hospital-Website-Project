import dbg from "debug";
const debug = dbg("socket:server");
const users = [];
import addUser from "./helpers/addUser";
import removeUser from "./helpers/removeUser";
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
