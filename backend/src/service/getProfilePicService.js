import dbg from "debug";
const debug = dbg("service:getPatientCases");
import checkToken from "../controllers/checkToken";
import getProfilePicFileName from "../data/getProfilePicFileName";
import getProfilePic from "../controllers/getProfilePic";
const getProfilePicSevice = async (token) => {
	return await checkToken(token)
		.then((response) => {
			return getProfilePicFileName(
				response.data.decoded.type,
				response.data.decoded.user_id
			);
		})
		.then((response) => {
			return getProfilePic(response.data.profile_pic);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default getProfilePicSevice;
