import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	isloading: false,
	error: "",
	type: 0,
	user: {},
	token: "",
	isauth: false,
};
const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loggedIn: (auth, action) => {
			auth.user = action.payload.user;
			auth.token = action.payload.token;
			auth.type = action.payload.type;
			localStorage.setItem("token", JSON.stringify(auth.token));
			auth.isauth = true;
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
			//auth.type = undefined;
			localStorage.clear();
		},
	},
});

export const { loggedIn, loggedOut, loggedWithToken } = slice.actions;

export default slice.reducer;
