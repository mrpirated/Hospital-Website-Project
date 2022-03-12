import dbg from "debug";
const debug = dbg("service:getProfilePicAdmin");
import checkToken from "../controllers/checkToken";
import getProfilePicFileName from "../data/getProfilePicFileName";
import getProfilePic from "../controllers/getProfilePic";
const getProfilePicAdminSevice = async (token, { doctor_id }) => {
	return await checkToken(token)
		.then((response) => {
			return getProfilePicFileName("doctor", doctor_id);
		})
		.then((response) => {
			return getProfilePic(response.data.profile_pic);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default getProfilePicAdminSevice;
