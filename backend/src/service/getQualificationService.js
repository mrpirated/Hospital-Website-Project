import checkToken from "../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:getQualification");
import getQualification from "../data/getQualification";
const getQualificationService = async (token) => {
	// return await checkToken(token)
	// 	.then((response) => {
	// 		if (response.success) {
	// 			return response.data.decoded;
	// 		} else {
	// 			return Promise.reject({
	// 				success: false,
	// 				message: "Token not verified",
	// 			});
	// 		}
	// 	})
	// 	.then((response) => {
	// 		return getQualification();
	// 	})
	return await getQualification().catch((err) => {
		return err;
	});
};
export default getQualificationService;
