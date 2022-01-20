import dbg from "debug";
const debug = dbg("socket:findUserBySocketId");

const findUserBySocketId = (users, socketId) => {
	return new Promise((resolve, reject) => {
		if (users.find((user) => (user.socketId = socketId))) {
			resolve({
				success: true,
				data: { user: users.find((user) => (user.socketId = socketId)) },
			});
		} else reject({ success: false });
	});
};
export default findUserBySocketId;
