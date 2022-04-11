import checkToken from "../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:getUserName");
import getCreatedTime from "../data/getCreatedTime";
import getUserName from "../controllers/getUserName";
const getUserNameService = async (token) => {
	var type, user_id;
	return await checkToken(token)
		.then((response) => {
			type = response.data.decoded.type;
			user_id = response.data.decoded.user_id;
			return getCreatedTime(
				response.data.decoded.type,
				response.data.decoded.user_id
			);
		})
		.then((response) => {
			return Promise.resolve({
				success: true,
				data: { userName: getUserName(type, user_id, response.data.created) },
			});
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default getUserNameService;
