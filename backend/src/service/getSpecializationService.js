import checkToken from "../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:getSpecialization");
import getSpecialization from "../data/getSpecialization";
const getSpecializationService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success) {
				return response.data.decoded;
			} else {
				return Promise.reject({
					success: false,
					message: "Token not verified",
				});
			}
		})
		.then((response) => {
			return getSpecialization();
		})
		.catch((err) => {
			return err;
		});
};
export default getSpecializationService;
