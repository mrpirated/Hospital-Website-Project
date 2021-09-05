import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navigation";
import PrivateRoute from "./components/PrivateRoute";
import Appointment from "./components/Appointment/Appointment";
import Doctors from "./components/Doctors/Doctors";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<PrivateRoute exact path='/appointment' component={Appointment} />
				<Route exact path='/doctors' component={Doctors} />
			</Switch>
		</Router>
	);
}

export default App;
