import dbg from "debug";
const debug = dbg("service:getPatientCases");
import checkToken from "../controllers/checkToken";
import getPatientCases from "../data/getPatientCases";
const getPatientCasesService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type === "patient") {
				return response.data.decoded;
			} else {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
		})
		.then((decoded) => {
			return getPatientCases(decoded.user_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default getPatientCasesService;
