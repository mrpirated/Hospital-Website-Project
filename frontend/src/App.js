import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import PatientLogin from "./components/PATIENT/Login/Login";
import PatientRoute from "./components/PATIENT/PatientRoute";
import DoctorRoute from "./components/DOCTOR/DoctorRoute";
import AdminRoute from "./components/ADMIN/AdminRoute";
import Home from "./components/HOME/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import tokenAPI from "./api/tokenAPI";
import { loggedWithToken } from "./store/auth";
import { useSelector } from "react-redux";
function App() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		if (!auth.isauth && localStorage.getItem("token")) {
			console.log("called");
			tokenAPI(JSON.parse(localStorage.getItem("token"))).then((res) => {
				dispatch(
					loggedWithToken({
						user: res.user,
						token: JSON.parse(localStorage.getItem("token")),
						type: res.type
					})
				);
				history.push("/patient");
			});
		}
	});

	// useEffect(()=>{
	//     if()
	// },[])
	return (
		<div>
			<Switch>
				<Route exact path='/login' component={PatientLogin} />
				<Route exact path='/home' component={Home} />
				<PatientRoute path='/patient' component={PatientRoute} />
				<AdminRoute path='/admin' component={AdminRoute} />
				<DoctorRoute path='/doctor' component={DoctorRoute} />
			</Switch>
		</div>
	);
}

export default App;
