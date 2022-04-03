import dbg from "debug";
const debug = dbg("service:admin/getPatients");
import checkToken from "../../controllers/checkToken";
import getPatients from "../../data/getPatients";
const getPatientsService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return getPatients();
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default getPatientsService;
