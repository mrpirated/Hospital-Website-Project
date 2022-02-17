import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Switch, useHistory } from "react-router";
import Cases from "./Cases/Cases";
import Appointment from "./Appointment/Appointment";
import MyAppointment from "./Cases/MyAppointment";
import Navitems from "./Navbar/Navitems";
import Navigation from "../Navigation";
import Doctors from "./Doctors/Doctors";
import NewCase from "./Cases/NewCase";
import NewAppointment from "./Cases/NewAppointment";
import Records from "./Records/Records";
import Profile from "./Profile/Profile";
import Rooms from "./Rooms/Rooms";
import Meeting from "./Meeting/Meeting";
import Calender from "./Calender/Calender";
export default function PatientRoute() {
	const auth = useSelector((state) => state.auth);

	const type = auth.type;
	const history = useHistory();
	//const { path, url } = useRouteMatch();

	useEffect(() => {
		//if(auth.checkToken )
		if (auth.checkToken && !(auth.isauth && type === "patient")) {
			history.push("/home");
		}
	}, [auth]);

	return (
		<div>
			<Navigation Navitems={Navitems} />
			<Switch>
				<Route path='/patient/cases' component={Cases} />
				<Route path='/patient/appointment' component={Appointment} />
				<Route path='/patient/records' component={Records} />
				<Route path='/patient/myappointment' component={MyAppointment} />
				<Route path='/patient/doctors' component={Doctors} />
				<Route path='/patient/new-case' component={NewCase} />
				<Route path='/patient/new-appointment' component={NewAppointment} />
				{/* <Route path='/patient/rooms' component={Rooms} /> */}
				<Route path='/patient/calender' component={Calender} />
				<Route path='/patient/profile' component={Profile} />
				<Route path='/patient/meeting' component={Meeting} />
			</Switch>
		</div>
	);
}
