import dbg from "debug";
const debug = dbg("service:getDoctorProfilePicsService");
import checkToken from "../controllers/checkToken";
import getDoctors from "../data/getDoctors";
import getDoctorProfilePic from "../controllers/getDoctorProfilePic";
const getDoctorProfilePicsService = async (token) => {
	// return await checkToken(token)
	// 	.then((response) => {
	// 		return getDoctors();
	// 	})
	return await getDoctors()
		.then((response) => {
			return getDoctorProfilePic(response.data.doctor);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};

export default getDoctorProfilePicsService;
