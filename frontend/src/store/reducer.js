import { combineReducers } from "redux";
import authReducer from "./auth";
import videoReducer from "./video";
import socketReducer from "./socket";
import alertReducer from "./alert";
import layoutReducer from "./layout";
export default combineReducers({
	auth: authReducer,
	video: videoReducer,
	socket: socketReducer,
	alert: alertReducer,
	layout: layoutReducer,
});
