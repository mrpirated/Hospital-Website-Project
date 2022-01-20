import dbg from "debug";
const debug = dbg("socket:removeUser");
import findUserBySocketId from "./findUserBySocketId";
const removeUser = (users, socket) => {
	debug("user disconnected " + socket.id);
	return findUserBySocketId(users, socket.id)
		.then((response) => {
			if (response.success) {
				users.splice(users.indexOf(response.data.user), 1);
			}
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default removeUser;
