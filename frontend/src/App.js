import React, { useEffect, useContext, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { SocketContext } from "./context/SocketContext";
import PatientLogin from "./components/PATIENT/Login/Login";
import DoctorLogin from "./components/DOCTOR/Login/Login";
import AdminLogin from "./components/ADMIN/Login/Login";
import PatientSignup from "./components/PATIENT/Signup/Signup";
import PatientRoute from "./components/PATIENT/PatientRoute";
import DoctorRoute from "./components/DOCTOR/DoctorRoute";
import AdminRoute from "./components/ADMIN/AdminRoute";
import Meeting from "./components/Meeting/Meeting";
import PatientForgot from "./components/PATIENT/ForgotPassword/ForgotPassword";
import DoctorForgot from "./components/DOCTOR/ForgotPassword/ForgotPassword";
import Home from "./components/HOME/Home";
import LoadingProvider from "./components/LoadingProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import tokenAPI from "./api/tokenAPI";
import {
	loggedWithToken,
	setLoading,
	tokenChecked,
	userUpdated,
} from "./store/auth";
import { titleChanged } from "./store/layout";
import { setSocketId } from "./store/socket";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import config from "./config/config";
import "./App.css";
function App() {
	const auth = useSelector((state) => state.auth);
	const layout = useSelector((state) => state.layout);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [socket, setSocket] = useContext(SocketContext);
	console.log("at app.js");
	useEffect(() => {
		dispatch(setLoading({ loading: true }));
		if (!auth.isauth && localStorage.getItem("token")) {
			const token = JSON.parse(localStorage.getItem("token"));
			tokenAPI(token)
				.then((res) => {
					if (res.success) {
						const socketio = io(config.baseUrl, {
							query: {
								token: "Bearer " + token,
							},
						});
						console.log(socketio);
						setSocket(socketio);
						socketio.on("yourID", (id) => {
							dispatch(setSocketId({ socketId: id }));
						});

						if (res.data.type === "admin") {
							res.data.user = { ...res.data.user, first_name: res.data.type };
						}
						dispatch(
							loggedWithToken({
								user: res.data.user,
								token: token,
								type: res.data.type,
							})
						);
						//console.log(browserHistory.);
						// if (res.type === "patient") {
						// 	if (
						// 		sessionStorage.getItem("lastPage") &&
						// 		sessionStorage.getItem("lastPage").includes("/patient")
						// 	) {
						// 		console.log(sessionStorage.getItem("lastPage"));
						// 		history.push(sessionStorage.getItem("lastPage"));
						// 	} else history.push("/patient");
						// } else if (res.type === "doctor") history.push("/doctor");
						// else if (res.type === "admin") {
						// 	if (
						// 		sessionStorage.getItem("lastPage") &&
						// 		sessionStorage.getItem("lastPage").includes("/admin")
						// 	) {
						// 		console.log(sessionStorage.getItem("lastPage"));
						// 		history.push(sessionStorage.getItem("lastPage"));
						// 	} else history.push("/admin");
						// }
					} else {
						dispatch(tokenChecked());
						//console.log(res);
						//alert(res.message);
						//history.push("/home");
					}
				})
				.finally(() => {
					dispatch(setLoading({ loading: false }));
				});
		} else {
			dispatch(tokenChecked());
			dispatch(setLoading({ loading: false }));
		}
		dispatch(titleChanged({ title: "PeriwalManavSeva" }));
	}, []);
	useEffect(() => {
		document.title = layout.title;
	}, [layout.title]);
	useEffect(() => {
		if (auth.updateUser) {
			tokenAPI(auth.token).then((response) => {
				dispatch(userUpdated({ user: response.data.user }));
			});
		}
	}, [auth.updateUser]);
	// useEffect(()=>{
	//     if()
	// },[])
	return (
		<div className='App'>
			<LoadingProvider
				active={auth.isloading}
				// spinner
				// text='Loading...'
				// styles={{
				// 	overlay: (base) => ({
				// 		...base,
				// 		background: "rgba(255, 255, 255, 0.7)",
				// 		color: "black",
				// 	}),
				// }}
			>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/doctor/login' element={<DoctorLogin />} />
					<Route exact path='/patient/forgot' element={<PatientForgot />} />
					<Route exact path='/doctor/forgot' element={<DoctorForgot />} />
					<Route exact path='/login' element={<PatientLogin />} />
					<Route exact path='/admin/login' element={<AdminLogin />} />
					<Route exact path='/signup' element={<PatientSignup />} />
					<Route exact path='/home' element={<Home />} />
					<Route path='/patient/*' element={<PatientRoute />} />
					<Route path='/admin/*' element={<AdminRoute />} />

					<Route path='/doctor/*' element={<DoctorRoute />} />

					<Route path='/meeting' element={<Meeting />} />
				</Routes>
			</LoadingProvider>
		</div>
	);
}

export default App;
