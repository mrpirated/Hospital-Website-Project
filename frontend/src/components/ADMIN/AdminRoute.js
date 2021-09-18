import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useStore } from "react-redux";
import { Switch, useHistory } from "react-router";
import Navitems from "./Navitems";
import Navigation from "../Navigation";
import Appointment from "./Appointment/Appointment";

export default function AdminRoute() {
	const store = useStore();
	const auth = store.getState().auth;
	console.log(auth);
	const isauth = auth.isauth;
	const type = auth.type;
	const history = useHistory();
	//console.log(isauth);
	useEffect(() => {
		if (!(isauth && type === 2)) {
			history.push("/home");
		}
	}, []);
	return (
		<div>
			<Navigation Navitems={Navitems} />
			<Switch>
				<Route path='/admin/appointment' component={Appointment} />
			</Switch>
		</div>
	);
}
