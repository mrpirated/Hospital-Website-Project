import checkToken from "../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:getUserName");
import getUserName from "../data/getUserName";
const getUserNameService = async (token) => {
	var type, user_id;
	return await checkToken(token)
		.then((response) => {
			type = response.data.decoded.type;
			user_id = response.data.decoded.user_id;
			return getUserName(
				response.data.decoded.type,
				response.data.decoded.user_id
			);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default getUserNameService;
