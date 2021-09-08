import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Type from "./Type";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";
import PatientLogin from "./components/PATIENT/Login/Login";
import DoctorLogin from "./components/DOCTOR/Login/Login";
import PatientHome from "./components/PATIENT/Home/Home";
import DoctorHome from "./components/DOCTOR/Home/Home";
import Signup from "./components/PATIENT/Signup/Signup";
import Appointment from "./components/PATIENT/Appointment/Appointment";
import DoctorAppointment from "./components/DOCTOR/Appointment/Appointment";
import Doctors from "./components/PATIENT/Doctors/Doctors";
import MyRoute from "./components/MyRoute";
import PatientRoute from "./components/PATIENT/PatientRoute";
import DoctorRoute from "./components/DOCTOR/DoctorRoute";
import AdminRoute from "./components/ADMIN/AdminRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import tokenAPI from "./api/tokenAPI";
import { loggedWithToken } from "./store/auth";
import { useSelector } from "react-redux";
function App() {
	// console.log(store.getState().auth.isauth);
	// if (!store.getState().auth.isauth && localStorage.getItem("token")) {
	// 	tokenAPI(JSON.parse(localStorage.getItem("token"))).then((res) => {
	// 		//console.log(res);
	// 		store.dispatch(
	// 			loggedWithToken({
	// 				user: res.user,
	// 				token: JSON.parse(localStorage.getItem("token")),
	// 			})
	// 		);
	// 	});
	// }
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	useEffect(() => {
		if (!auth.isauth && localStorage.getItem("token")) {
			console.log("called");
			tokenAPI(JSON.parse(localStorage.getItem("token"))).then((res) => {
				dispatch(
					loggedWithToken({
						user: res.user,
						token: JSON.parse(localStorage.getItem("token")),
					})
				);
			});
		}
	}, []);

	// useEffect(()=>{
	//     if()
	// },[])
	return (
		<Router>
			<Switch>
				<Route exact path='/login' component={PatientLogin} />
				<Route exact path='/home' component={PatientHome} />
				<PatientRoute path='/patient' component={PatientRoute} />
				<AdminRoute path='/admin' component={AdminRoute} />
				<DoctorRoute path='/doctor' component={DoctorRoute} />
			</Switch>
		</Router>
	);
}

export default App;
