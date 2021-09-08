import "./App.css";

import Home from "./components/PATIENT/Home/Home";

//import PatientRoute from "./components/PatientRoute";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
	return (
		<Home />
		// <Router>
		// 	<PatientNavbar />
		// 	{/* <DoctorNavbar/> */}
		// 	<Switch>
		// 		<MyRoute exact path='/login-doctor' component={DoctorLogin} />
		// 		<MyRoute exact path='/login' component={PatientLogin} />
		// 		<MyRoute exact path='/signup' component={Signup} />
		// 		<PatientRoute exact path='/appointment' component={Appointment} />
		// 		<DoctorRoute exact path='/doctor-appointment' component={DoctorAppointment} />
		// 		<AdminRoute exact path='/admin' component />
		// 		<PatientRoute exact path='/doctors' component={Doctors} />
		// 	</Switch>
		// </Router>
	);
}

export default App;
