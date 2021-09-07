import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isloading: false,
	error: "",
	type: 0,
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: {},
	token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
	isauth: localStorage.getItem("isauth")
		? JSON.parse(localStorage.getItem("isauth"))
		: false,
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loggedIn: (auth, action) => {
			auth.user = action.payload.user;
			localStorage.setItem("user", JSON.stringify(auth.user));
			auth.token = action.payload.token;
			localStorage.setItem("token", JSON.stringify(auth.token));
			auth.isauth = true;
			localStorage.setItem("isauth", JSON.stringify(auth.isauth));
		},
		loggedOut: (auth, action) => {
			auth.user = {};
			auth.token = "";
			auth.isauth = false;
			localStorage.clear();
		},
	},
});

export const { loggedIn, loggedOut } = slice.actions;

export default slice.reducer;
