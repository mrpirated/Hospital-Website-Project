import { combineReducers } from "redux";
import authReducer from "./auth";
import videoReducer from "./video";
import socketReducer from "./socket";
export default combineReducers({
	auth: authReducer,
	video: videoReducer,
	socket: socketReducer,
});
