import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import { useSelector, useStore } from "react-redux";
import Appointment from "./Appointment/Appointment";
import Navitems from "./Navbar/Navitems";
import Navigation from "../Navigation";
import Home from "./Home/Home";
import Doctors from "./Doctors/Doctors";
export default function PatientRoute() {
	const store = useStore();
	const auth = store.getState().auth;
	const isauth = auth.isauth;
	const type = auth.type;
	//console.log(isauth);
	if (!(isauth && type === 0)) {
		<Redirect to='home' />;
	}
	return (
		<Router>
			<Navigation Navitems={Navitems} />
			<Home />
			<Switch>
				<Route exact path='appointment' component={Appointment} />
				<Route exact path='doctors' component={Doctors} />
			</Switch>
		</Router>
	);
}
