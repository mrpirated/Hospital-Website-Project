import { createSlice } from "@reduxjs/toolkit";
import tokenAPI from "../api/tokenAPI";
const initialState = () => {
	if (localStorage.getItem("token")) {
		// const user = await tokenAPI(JSON.parse(localStorage.getItem("token")));
		// console.log(user);
		//console.log(user);
		return {
			isloading: false,
			error: "",
			type: 0,
			user: {},
			token: localStorage.getItem("token"),
			isauth: true,
		};
	} else {
		return {
			isloading: false,
			error: "",
			type: 0,
			user: {},
			token: "",
			isauth: false,
		};
	}
	// isloading: false,
	// error: "",
	// type: 0,
	// user: localStorage.getItem("user")
	// 	? JSON.parse(localStorage.getItem("user"))
	// 	: {},
	// token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
	// isauth: localStorage.getItem("isauth")
	// 	? JSON.parse(localStorage.getItem("isauth"))
	// 	: false,
};

const slice = createSlice({
	name: "auth",
	initialState: initialState(),
	reducers: {
		loggedIn: (auth, action) => {
			auth.user = action.payload.user;
			//localStorage.setItem("user", JSON.stringify(auth.user));
			auth.token = action.payload.token;
			localStorage.setItem("token", JSON.stringify(auth.token));
			auth.isauth = true;
			//localStorage.setItem("isauth", JSON.stringify(auth.isauth));
		},
		loggedWithToken: (auth, action) => {
			auth.user = action.payload.user;
			auth.token = action.payload.token;
			auth.isauth = true;
		},
		loggedOut: (auth, action) => {
			auth.user = {};
			auth.token = "";
			auth.isauth = false;
			auth.type = undefined;
			localStorage.clear();
		},
	},
});

export const { loggedIn, loggedOut } = slice.actions;

export default slice.reducer;
