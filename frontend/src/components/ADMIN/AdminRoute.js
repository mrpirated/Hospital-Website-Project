import React from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { useStore } from "react-redux";

import Navigation from "../Navigation";
export default function AdminRoute() {
	const store = useStore();
	const auth = store.getState().auth;
	console.log(auth);
	const isauth = auth.isauth;
	const type = auth.type;
	//console.log(isauth);
	if (!(isauth && type === 0)) {
		<Redirect to='home' />;
	}
	return (
		<Router>
			<Navigation />
		</Router>
	);
}
