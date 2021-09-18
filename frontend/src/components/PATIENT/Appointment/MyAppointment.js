import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import "./MyAppointment.css";
import patientMyAppointmentAPI from "../../../api/patientMyAppointmentAPI";

export default function MyAppointment(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		if (!(auth.isauth && auth.type === 0)) {
			history.push("/home");
		}
		if (props.location.state === undefined) {
			history.push("/home");
		} else {
			patientMyAppointmentAPI({
				token: auth.token,
				case_id: props.location.state.case_id,
			}).then((res) => {
				if (res.reply) {
					setAppointments(res.appointments);
				} else {
					alert(res.data.msg + "\nYou will be redirected to Home.");
					setTimeout(history.push("/home"), 4000);
				}
			});
		}
	}, []);

	return (
		<div>
			<Card
				className='MyAppointment-AddCard'
				onClick={() => {
					history.push("/patient/doctors");
				}}
				bg='dark'
				text='white'
				style={{ width: "20rem", margin: "2rem", display: "inline-grid" }}
			>
				<Card.Body>
					<Card.Title>Create New Appointment</Card.Title>
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
				</Card.Body>
			</Card>
			{appointments.map((c) => (
				<Card
					className='MyAppointment-Card'
					onClick={() => {
						history.push("/patient/doctors");
					}}
					bg='dark'
					text='white'
					style={{ width: "20rem", margin: "2rem", display: "inline-grid" }}
				>
					<Card.Body>
						<Card.Title>Appointment Id: {c.appointment_id}</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</Card.Text>
					</Card.Body>
				</Card>
			))}
		</div>
	);
}
