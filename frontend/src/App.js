import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import PatientLogin from "./components/PATIENT/Login/Login";
import DoctorLogin from "./components/DOCTOR/Login/Login";
import AdminLogin from "./components/ADMIN/Login/Login";
import PatientSignup from "./components/PATIENT/Signup/Signup";
import PatientRoute from "./components/PATIENT/PatientRoute";
import DoctorRoute from "./components/DOCTOR/DoctorRoute";
import AdminRoute from "./components/ADMIN/AdminRoute";
import Home from "./components/HOME/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import tokenAPI from "./api/tokenAPI";
import { loggedWithToken } from "./store/auth";
import { useSelector } from "react-redux";
import "./App.css";
function App() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		const checktoken = async () => {
			if (!auth.isauth && localStorage.getItem("token")) {
				await tokenAPI(JSON.parse(localStorage.getItem("token"))).then(
					(res) => {
						if (res.success) {
							if (res.data.type === "Admin") {
								res.data.user = { ...res.data.user, first_name: res.data.type };
							}
							dispatch(
								loggedWithToken({
									user: res.data.user,
									token: JSON.parse(localStorage.getItem("token")),
									type: res.data.type,
								})
							);
							//console.log(browserHistory.);
							if (res.type === "patient") {
								if (
									sessionStorage.getItem("lastPage") &&
									sessionStorage.getItem("lastPage").includes("/patient")
								) {
									console.log(sessionStorage.getItem("lastPage"));
									history.push(sessionStorage.getItem("lastPage"));
								} else history.push("/patient");
							} else if (res.type === "doctor") history.push("/doctor");
							else if (res.type === "admin") {
								if (
									sessionStorage.getItem("lastPage") &&
									sessionStorage.getItem("lastPage").includes("/admin")
								) {
									console.log(sessionStorage.getItem("lastPage"));
									history.push(sessionStorage.getItem("lastPage"));
								} else history.push("/admin");
							}
						} else {
							alert(res.message);
						}
					}
				);
			}
		};
		checktoken();
	}, []);

	// useEffect(()=>{
	//     if()
	// },[])
	return (
		<div>
			<Switch>
				<Route
					exact
					path='/'
					render={() => {
						history.push("/home");
					}}
				/>
				<Route exact path='/doctor/login' component={DoctorLogin} />
				<Route exact path='/login' component={PatientLogin} />
				<Route exact path='/admin/login' component={AdminLogin} />
				<Route exact path='/signup' component={PatientSignup} />
				<Route exact path='/home' component={Home} />
				<Route path='/patient' component={PatientRoute} />
				<Route path='/admin' component={AdminRoute} />
				<Route path='/doctor' component={DoctorRoute} />
			</Switch>
		</div>
	);
}

export default App;
