import dbg from "debug";
const debug = dbg("service:newCase");
import checkToken from "../controllers/checkToken";
import addNewCase from "../data/addNewCase";
const newCaseService = async ({ token, case_description }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "patient") {
				return response.data.decoded;
			} else {
				if (response.success) {
					return Promise.reject({ success: false, message: "Not Authorized" });
				} else return Promise.reject(response);
			}
		})
		.then((decoded) => {
			return addNewCase(decoded.user_id, case_description);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default newCaseService;
