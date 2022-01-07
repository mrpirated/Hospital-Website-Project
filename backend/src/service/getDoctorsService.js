import dbg from "debug";
const debug = dbg("service:getDoctorsCases");
import checkToken from "../controllers/checkToken";
import getDoctors from "../data/getDoctors";
import getDoctorSpecialization from "../data/getDoctorSpecialization";
const getDoctorsService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success) {
				return response.data.decoded;
			} else {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
		})
		.then((decoded) => {
			return getDoctors();
		})
		.then((response) => {
			if (response.success) {
				return getDoctorSpecialization(response.data.doctor);
			} else return response;
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default getDoctorsService;
