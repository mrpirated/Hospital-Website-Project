import React, { useEffect, useState } from "react";
import remaining_appointmentAPI from "../../../api/remaining_appointmentAPI";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Appointment.css";
function Appointment() {
	const token = useSelector((state) => state.auth.token);
	const [appointments, setappointments] = useState([]);
	//console.log(token);
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

	return (
		<div>
			{appointments.map((ap) => (
				<Card
					className='Appointment-AddCard'
					style={{
						width: "75%",
						marginLeft: "12.5%",
						marginTop: "1%",
						marginBottom: "1%",
						display: "inline-grid",
						backgroundColor: "aquamarine",
					}}
				>
					<Card.Body>
						<Card.Text
							style={{
								display: "inline-block",
							}}
						>
							Appointment ID: {ap.appointment_id}
						</Card.Text>
						<Card.Text
							style={{
								display: "inline-block",
								textAlign: "right",
							}}
						>
							Case ID: {ap.case_id}
						</Card.Text>
					</Card.Body>
				</Card>
			))}
		</div>
	);
}

export default Appointment;
