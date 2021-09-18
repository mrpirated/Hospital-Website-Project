import React, { useEffect, useState } from "react";
import remaining_appointmentAPI from "../../../api/remaining_appointmentAPI";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Appointment.css";
function Appointment() {
	const token = useSelector((state) => state.auth.token);
	const [appointments, setappointments] = useState();
	//console.log(token);
	useEffect(() => {
		const fetchData = async () => {
			await remaining_appointmentAPI(token).then((res) => {
				setappointments(res);
				//console.log(res);
			});
		};
		fetchData();
		//console.log(appointments[0]);
	}, [token]);

	return (
		<div>
			<Card
				className='Appointment-AddCard'
				style={{
					width: "75%",
					margin: "5%",
					display: "inline-grid",
					backgroundColor: "aquamarine",
				}}
			>
				<Card.Body>
					<Card.Title>Create New Case</Card.Title>
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
}

export default Appointment;
