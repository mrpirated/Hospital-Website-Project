import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
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
	const navigate = useNavigate();
	//const { path, url } = useRouteMatch();

	useEffect(() => {
		//if(auth.checkToken )
		if (auth.checkToken && !(auth.isauth && type === "patient")) {
			navigate("/home");
		}
	}, [auth]);

	return (
		<div>
			<Navigation Navitems={Navitems} />
			<Routes>
				<Route path='cases' element={<Cases />} />
				<Route path='appointment' element={<Appointment />} />
				<Route path='records' element={<Records />} />
				<Route path='myappointment' element={<MyAppointment />} />
				<Route path='doctors' element={<Doctors />} />
				<Route path='new-case' element={<NewCase />} />
				<Route path='new-appointment' element={<NewAppointment />} />
				<Route path='rooms' element={<Rooms />} />
				{/* <Route path='rooms' element={Rooms} /> */}
				<Route path='calender' element={<Calender />} />
				<Route path='profile' element={<Profile />} />
				<Route path='meeting' element={<Meeting />} />
			</Routes>
		</div>
	);
}
