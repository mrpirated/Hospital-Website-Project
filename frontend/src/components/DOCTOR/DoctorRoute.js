import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import { useSelector, useStore } from "react-redux";
import Navitems from "./Navbar/Navitems";
import Navigation from "../Navigation";
export default function PatientRoute() {
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
			<Navigation Navitems={Navitems} />
			<Switch></Switch>
		</Router>
	);
}
