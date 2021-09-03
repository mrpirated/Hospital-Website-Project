import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
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
	},
	reducers: {
		loginPending: (state) => {
			state.isloading = true;
		},
		loginSucess: (auth) => {
			auth.isloading = false;
			auth.token = undefined;
			auth.error = "";
		},
		loginFailed: (auth, { payload }) => {
			auth.isloading = false;
			auth.error = payload;
		},
		loggedIn: (auth, action) => {
			auth.user = action.payload.user;
			auth.token = action.payload.token;
		},
		loggedOut: (auth, action) => {
			auth.user = undefined;
			auth.token = undefined;
		},
	},
});

export const { loggedIn, loggedOut, loginPending } = slice.actions;

export default slice.reducer;
