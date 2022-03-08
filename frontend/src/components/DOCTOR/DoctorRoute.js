import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Navitems from "./Navbar/Navitems";
import Navigation from "../Navigation";
import Calendar from "./Calendar/Calendar";
import Appointment from "./Appointment/Appointment";
import AppointmentDetails from "./Appointment/AppointmentDetails";
import Availability from "./Availability/Availability";
import Profile from "./Profile/Profile";
import Rooms from "./Rooms/Rooms";
import Meeting from "./Meeting/Meeting";
import Doctors from "./Doctors/Doctors";
export default function PatientRoute() {
	const auth = useSelector((state) => state.auth);
	//const isauth = auth.isauth;
	const type = auth.type;
	const navigate = useNavigate();
	//console.log(isauth);
	// console.log("at doctor route");
	console.log(auth);
	useEffect(() => {
		//if(auth.checkToken )
		if (auth.checkToken && !(auth.isauth && type === "doctor")) {
			navigate("login");
		}
	}, [auth]);

	return (
		<div>
			<Navigation Navitems={Navitems} />
			<Routes>
				<Route path='doctors' element={<Doctors />} />
				<Route path='calendar' element={<Calendar />} />
				<Route path='appointment' element={<Appointment />} />
				<Route path='appointment-details' element={<AppointmentDetails />} />
				<Route path='availability' element={<Availability />} />
				<Route path='profile' element={<Profile />} />
				<Route path='rooms' element={<Rooms />} />
				<Route path='meeting' element={<Meeting />} />
				{/* <Route path='doctors' element={Doctors} /> */}
			</Routes>
		</div>
	);
}
