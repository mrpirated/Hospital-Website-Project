import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PatientLogin from "./components/PATIENT/Login/Login";
import DoctorLogin from "./components/DOCTOR/Login/Login";
import Home from "./components/PATIENT/Home/Home";
import Signup from "./components/PATIENT/Signup/Signup";
import PatientNavbar from "./components/PATIENT/Navbar/Navigation";
import DoctorNavbar from "./components/DOCTOR/Navbar/Navigation";
import Appointment from "./components/PATIENT/Appointment/Appointment";
import DoctorAppointment from "./components/DOCTOR/Appointment/Appointment";
import Doctors from "./components/PATIENT/Doctors/Doctors";
import MyRoute from "./components/MyRoute";
import PatientRoute from "./components/PatientRoute";
import DoctorRoute from "./components/DoctorRoute";
import AdminRoute from "./components/AdminRoute";
//import PatientRoute from "./components/PatientRoute";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
	return (
		<DoctorNavbar/>
		// <Router>
		// 	<DoctorNavbar/>
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
