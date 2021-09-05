import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "auth",
	initialState: {
		isloading: false,
		error: "",
		user: {
			// id: undefined,
			// type: undefined,
			// first_name: undefined,
			// last_name: undefined,
			// dob: undefined,
			// gender: undefined,
			// address: undefined,
			// email: undefined,
			// phone: undefined,
		},
		token: "",
		isauth: false,
	},
	reducers: {
		loggedIn: (auth, action) => {
			auth.user = action.payload.user;
			auth.token = action.payload.token;
			auth.isauth = true;
		},
		loggedOut: (auth, action) => {
			auth.user = {};
			auth.token = "";
			auth.isauth = false;
		},
	},
});

export const { loggedIn, loggedOut } = slice.actions;

export default slice.reducer;
