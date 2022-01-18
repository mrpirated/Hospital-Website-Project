import dbg from "debug";
const debug = dbg("socket:server");
const users = new Map();
const socketServer = (io) => {
	io.on("connection", (socket) => {
		debug("a user connected! ID :- " + socket.id);
		if (!users[socket.id]) {
			users[socket.id] = socket.id;
			debug(users);
		}
		socket.emit("yourID", socket.id);
		io.sockets.emit("allUsers", users);
		socket.on("disconnect", () => {
			delete users[socket.id];
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
