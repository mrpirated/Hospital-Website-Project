import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

export default function AppointmentDetails(props) {
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!(auth.isauth && auth.type === 1)) {
			navigate("/home");
		}
		if (props.location.state === undefined) {
			navigate("/home");
		} else {
			console.log("Hello");
		}
	}, []);

	return <div>Appointment Details</div>;
}
