import dbg from "debug";
const debug = dbg("service:getDoctorsCases");
import checkToken from "../controllers/checkToken";
import getDoctors from "../data/getDoctors";
const getDoctorsService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "patient") {
				return response.data.decoded;
			} else {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
		})
		.then((decoded) => {
			return getDoctors();
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default getDoctorsService;
