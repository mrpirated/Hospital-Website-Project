import dbg from "debug";
const debug = dbg("service:getDoctorsService");
import checkToken from "../controllers/checkToken";
import getDoctors from "../data/getDoctors";
import getAllDoctorSpecialization from "../data/getAllDoctorSpecialization";
import getAllDoctorQualification from "../data/getAllDoctorQualification";
import getDoctorProfilePic from "../controllers/getDoctorProfilePic";
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
		// .then((response) => {
		// 	return getDoctorProfilePic(response.data.doctor);
		// })
		.then((response) => {
			//debug(response);
			return getAllDoctorSpecialization(response.data.doctor);
		})
		.then((response) => {
			return getAllDoctorQualification(response.data.doctor);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default getDoctorsService;
