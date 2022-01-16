import dbg from "debug";
const debug = dbg("service:addUserDetailsService");
import checkToken from "../controllers/checkToken";
import addUserDetails from "../data/addUserDetails";
const addUserDetailsService = async (token, values) => {
	return await checkToken(token)
		.then((response) => {
			return response.data.decoded;
		})
		.then((decoded) => {
			return addUserDetails(values, decoded);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default addUserDetailsService;
