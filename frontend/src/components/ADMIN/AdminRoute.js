import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useStore } from "react-redux";
import { useNavigate, useRouteMatch } from "react-router";
import Navitems from "./Navitems";
import Navigation from "../Navigation";
import Appointment from "./Appointment/Appointment";
import SetAppointment from "./SetAppointment/SetAppointment";
import Doctors from "./Doctors/Doctors";
import AddDoctor from "./AddDoctor/AddDoctor";
import Profile from "./Profile/Profile";
import Home from "./Home/Home";
import EditDoctor from "./EditDoctor/EditDoctor";
export default function AdminRoute() {
	const store = useStore();
	const auth = store.getState().auth;
	//console.log(auth);
	//const isauth = auth.isauth;
	const type = auth.type;
	const navigate = useNavigate();
	//const { path, url } = useRouteMatch();
	//console.log(isauth);
	useEffect(() => {
		//if(auth.checkToken )
		if (auth.checkToken && !(auth.isauth && type === "admin")) {
			navigate("login");
		}
	}, [auth]);
	return (
		<div>
			<Navigation Navitems={Navitems} />
			<Routes>
				{/* <Route path='appointment' element={<Appointment />} /> */}
				<Route path='doctors' element={<Doctors />} />
				{/* <Route path='setappointment' element={<SetAppointment />} /> */}
				<Route path='profile' element={<Profile />} />
				<Route path='add-doctor' element={<AddDoctor />} />
				<Route path='home' element={<Home />} />
				<Route path='edit-doctor' element={<EditDoctor />} />
			</Routes>
		</div>
	);
}
