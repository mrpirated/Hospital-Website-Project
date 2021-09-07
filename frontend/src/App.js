import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import PatientRoute from "./components/PatientRoute";
import DoctorRoute from "./components/DoctorRoute";
import AdminRoute from "./components/AdminRoute";
//import PatientRoute from "./components/PatientRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function App() { 
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Type} />
                <Route exact path='/pat' component={PatientDashboard} />
                <Route exact path='/doc' component={DoctorDashboard} />
                <MyRoute exact path='/login-doctor' component={DoctorLogin} />
				<MyRoute exact path='/login' component={PatientLogin} />
				<MyRoute exact path='/signup' component={Signup} />
                <PatientRoute exact path='/appointment' component={Appointment} />
                <PatientRoute exact path='/home' component={PatientHome} />
				<PatientRoute exact path='/doctors' component={Doctors} />
                <DoctorRoute exact path='/doctor-appointment' component={DoctorAppointment} />
                <DoctorRoute exact path='/doctor-home' component={DoctorHome} />
				<AdminRoute exact path='/admin' component />
			</Switch>
		</Router>
    )
}

export default App
