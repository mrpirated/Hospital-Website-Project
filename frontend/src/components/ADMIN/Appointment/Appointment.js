import React, { useEffect, useState } from "react";
import remaining_appointmentAPI from "../../../api/remaining_appointmentAPI";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./Appointment.css";
import { Route, Switch, useRouteMatch, useHistory } from "react-router";
function Appointment() {
	const token = useSelector((state) => state.auth.token);
	const [appointments, setappointments] = useState([]);
	//console.log(token);
	const history = useHistory();
	const { path, url } = useRouteMatch();
	useEffect(() => {
		const fetchData = async () => {
			await remaining_appointmentAPI(token).then((res) => {
				setappointments(res);
				//console.log(res);
			});
		};
		fetchData();
		console.log(appointments);
	}, []);
	const onCLickAppointment = (card) => {
		history.push("/admin/setappointment");
	};
	return (
		<div>
			{appointments.map((ap) => (
				<Card
					className='Appointment-AddCard'
					style={{
						width: "20rem",
						marginLeft: "4rem",
						marginRight: "4rem",
						marginTop: "2rem",
						marginBottom: "2rem",
						display: "inline-grid",
						backgroundColor: "aquamarine",
					}}
					onClick={() => onCLickAppointment(ap)}
				>
					<Card.Body>
						{/* <Card.Text>Appointment ID: {ap.appointment_id}</Card.Text>
						<Card.Text>Case ID: {ap.case_id}</Card.Text> */}
						<Card.Text>Name: {ap.patient_name}</Card.Text>
						<Card.Text>Doctor: {ap.doctor_name}</Card.Text>
					</Card.Body>
				</Card>
			))}
		</div>
	);
}

export default Appointment;
