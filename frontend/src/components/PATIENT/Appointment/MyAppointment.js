import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Card, Form, Modal, Row, Col, Button } from "react-bootstrap";
import "./MyAppointment.css";
import patientMyAppointmentAPI from "../../../api/patientMyAppointmentAPI";
import format from "date-fns/format";
export default function MyAppointment(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [appointments, setAppointments] = useState([]);
	const [openPopup, setopenPopup] = useState(false);
	const [selectedAP, setselectedAP] = useState({});
	useEffect(() => {
		if (!(auth.isauth && auth.type === 0)) {
			history.push("/home");
		}
		if (props.location.state === undefined) {
			history.push("/home");
		}
		const fetchData = async () => {
			await patientMyAppointmentAPI({
				token: auth.token,
				case_id: props.location.state.case_details.case_id,
			}).then((res) => {
				if (res.reply) {
					setAppointments(res.appointments);
				} else {
					//alert(res.data.msg + "\nYou will be redirected to Home.");
					setTimeout(history.push("/home"), 4000);
				}
			});
		};

		fetchData();
		console.log(appointments);
	}, []);
	const onSelectAppointment = async (app) => {
		setselectedAP(app);
		setopenPopup(true);
	};
	return (
		<div>
			<Card
				className='MyAppointment-AddCard'
				onClick={() => {
					history.push("/patient/new-appointment", {
						case_details: props.location.state.case_details,
					});
				}}
				bg='dark'
				text='white'
				style={{ width: "20rem", margin: "2rem", display: "inline-grid" }}
			>
				<Card.Body>
					<Card.Title>Create New Appointment</Card.Title>
					<Card.Text></Card.Text>
				</Card.Body>
			</Card>
			{appointments.map((c) => (
				<Card
					className='MyAppointment-Card'
					onClick={() => onSelectAppointment(c)}
					bg='dark'
					text='white'
					style={{ width: "20rem", margin: "2rem", display: "inline-grid" }}
				>
					<Card.Body>
						<Card.Title>Appointment Id: {c.appointment_id}</Card.Title>
						<Card.Text>Doctor: {c.doctor_name}</Card.Text>
						<Card.Text>
							Date: {new Date(c.start_time).toString().slice(0, 15)}
						</Card.Text>
					</Card.Body>
				</Card>
			))}
			<Modal
				size='lg'
				aria-labelledby='example-custom-modal-styling-title'
				show={openPopup}
				onHide={() => setopenPopup(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='example-custom-modal-styling-title'>
						Appointment Details
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row style={{ margin: "1rem" }}>
							<Form.Group as={Col}>
								<Form.Label>Case ID:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.case_id}
									disabled={true}
									// onChange={(e) => setFirstName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Appointment ID:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.appointment_id}
									disabled={true}
									// onChange={(e) => setLastName(e.target.value)}
								/>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group as={Col}>
								<Form.Group>
									<Form.Label>
										Date:{" "}
										{new Date(selectedAP.start_time).toString().slice(0, 15)}
									</Form.Label>
								</Form.Group>
							</Form.Group>
						</Row>
						<Row style={{ margin: "1rem" }}>
							<Form.Group as={Col}>
								<Form.Label>Start Time</Form.Label>
								<Form.Control
									type='text'
									value={new Date(selectedAP.start_time)}
									disabled={true}
									// onChange={(e) => setLastName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>End Time</Form.Label>
								<Form.Control
									type='text'
									value={new Date(selectedAP.end_time)}
									disabled={true}
									// onChange={(e) => setLastName(e.target.value)}
								/>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group as={Col}>
								<Form.Group>
									<a href={selectedAP.meeting_link} target='_blank'>
										Meeting Link
									</a>
								</Form.Group>
							</Form.Group>
						</Row>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
}
