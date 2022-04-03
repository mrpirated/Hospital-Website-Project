import dbg from "debug";
const debug = dbg("service:admin/addUserDetailsService");
import checkToken from "../../controllers/checkToken";
import addUserDetailsAdmin from "../../data/addUserDetailsAdmin";
const addUserDetailsService = async (token, values) => {
	return await checkToken(token)
		.then((response) => {
			return response.data.decoded;
		})
		.then((decoded) => {
			return addUserDetailsAdmin(values);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default addUserDetailsService;
