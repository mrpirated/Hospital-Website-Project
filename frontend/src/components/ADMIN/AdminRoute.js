import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useStore } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import Navitems from "./Navitems";
import Navigation from "../Navigation";
import Appointment from "./Appointment/Appointment";
import SetAppointment from "./SetAppointment/SetAppointment";
import Doctors from "./Doctors/Doctors";
import AddDoctor from "./AddDoctor/AddDoctor";

export default function AdminRoute() {
	const store = useStore();
	const auth = store.getState().auth;
	//console.log(auth);
	//const isauth = auth.isauth;
	const type = auth.type;
	const history = useHistory();
	//const { path, url } = useRouteMatch();
	//console.log(isauth);
	useEffect(() => {
		//if(auth.checkToken )
		if (auth.checkToken && !(auth.isauth && type === "admin")) {
			history.push("/home");
		}
	}, [auth]);
	return (
		<div>
			<Navigation Navitems={Navitems} />
			<Switch>
				<Route path='/admin/appointment' component={Appointment} />
				<Route path='/admin/doctors' component={Doctors} />
				<Route path='/admin/setappointment' component={SetAppointment} />
				<Route path='/admin/add-doctor' component={AddDoctor} />
			</Switch>
		</div>
	);
}
