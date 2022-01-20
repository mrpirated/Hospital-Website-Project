import dbg from "debug";
const debug = dbg("socket:addUser");
import checkToken from "../../controllers/checkToken";
const addUser = async (token, users, socket) => {
	return await checkToken(token)
		.then((response) => {
			users.push({
				user_id: response.data.decoded.user_id,
				type: response.data.decoded.type,
				socketId: socket.id,
				token: token,
			});

			return Promise.resolve({ success: true });
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default addUser;
