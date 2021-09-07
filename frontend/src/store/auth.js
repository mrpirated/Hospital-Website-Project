import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isloading: false,
	error: "",
	type: localStorage.getItem("type"),
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
			auth.type = action.payload.type;
			localStorage.setItem("type", JSON.stringify(auth.type));

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
