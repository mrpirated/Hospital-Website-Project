import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Switch, useHistory } from "react-router";
import Appointment from "./Appointment/Appointment";
import Navitems from "./Navbar/Navitems";
import Navigation from "../Navigation";
import Doctors from "./Doctors/Doctors";
export default function PatientRoute() {
	const auth = useSelector((state) => state.auth);
	const isauth = auth.isauth;
	const type = auth.type;
	const history = useHistory();
	//const { path, url } = useRouteMatch();

	useEffect(() => {
		if (!(isauth && type === 0)) {
			history.push("/home");
		}
	});

	return (
		<div>
			<Navigation Navitems={Navitems} />

			<Route path='/patient/appointment' component={Appointment} />
			<Route path='/patient/doctors' component={Doctors} />
		</div>
	);
}
