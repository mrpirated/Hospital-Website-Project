import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/PATIENT/Login/Login";
import Home from "./components/PATIENT/Home/Home";
import Signup from "./components/PATIENT/Signup/Signup";
import Navbar from "./components/PATIENT/Navbar/Navigation";
import Appointment from "./components/PATIENT/Appointment/Appointment";
import Doctors from "./components/PATIENT/Doctors/Doctors";
import MyRoute from "./components/MyRoute";
import PatientRoute from "./components/PatientRoute";
import DoctorRoute from "./components/DoctorRoute";
import AdminRoute from "./components/AdminRoute";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Home} />
				<MyRoute exact path='/login' component={Login} />
				<MyRoute exact path='/signup' component={Signup} />
				<PatientRoute exact path='/appointment' component={Appointment} />
				<DoctorRoute exact path='/doctor-appointment' component />
				<AdminRoute exact path='/admin' component />
				<PatientRoute exact path='/doctors' component={Doctors} />
			</Switch>
		</Router>
	);
}

export default App;
