import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useStore } from "react-redux";
import { Switch, useHistory, useRouteMatch } from "react-router";
import Navitems from "./Navitems";
import Navigation from "../Navigation";
import Appointment from "./Appointment/Appointment";
import SetAppointment from "./SetAppointment/SetAppointment";
import Doctors from "./Doctors/Doctors";

export default function AdminRoute() {
	const store = useStore();
	const auth = store.getState().auth;
	//console.log(auth);
	const isauth = auth.isauth;
	const type = auth.type;
	const history = useHistory();
	const { path, url } = useRouteMatch();
	//console.log(isauth);
	useEffect(() => {
		if (!(isauth && type === 2)) {
			history.push("/admin/login");
		}
	}, []);
	return (
		<div>
			<Navigation Navitems={Navitems} />
			<Switch>
				<Route path={`${path}/appointment`} component={Appointment} />
				<Route path={`${path}/doctors`} component={Doctors} />
				<Route path={`${path}/setappointment`} component={SetAppointment} />
			</Switch>
		</div>
	);
}
