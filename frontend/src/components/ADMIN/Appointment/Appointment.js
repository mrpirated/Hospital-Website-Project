import React, { useEffect, useState } from "react";
import remaining_appointmentAPI from "../../../api/remaining_appointmentAPI";
import adminDoctorScheduleAPI from "../../../api/adminDoctorScheduleAPI";
import { Card, Modal, DropdownButton, Dropdown, Form, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import DataTable from "../../DataTable";
import "./Appointment.css";
import { Route, Switch, useRouteMatch, useHistory } from "react-router";
function Appointment() {
	const token = useSelector((state) => state.auth.token);
	const [appointments, setappointments] = useState([]);
	const [doa, setDoa] = useState(new Date());
	const [openPopup, setopenPopup] = useState(false);
	const [selectedAP, setselectedAP] = useState({});
	const [docschedule, setdocschedule] = useState([]);
	const [selectedtime, setselectedtime] = useState("Select Time");
	const col = [
		{
			title: "Start Time",
			field: "start_time",
		},
		{
			title: "End Time",
			field: "end_time",
		},
	];
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
	}, [openPopup]);
	const getDoctorSchedule = async (data) => {
		await adminDoctorScheduleAPI({
			token: token,
			doctor_id: data.doctor_id,
		}).then((res) => {
			if (res.reply) {
				console.log(res);
				// setDoa(res.schedule.length > 0 ? new Date(res.schedule[0]) : "");
				setdocschedule(res.schedule);
			}
		});
	};
	const onCLickAppointment = async (card) => {
		//console.log(1);
		setselectedAP(card);
		//console.log(selectedAP);
		await getDoctorSchedule(card);
		console.log(docschedule);
		setopenPopup(true);
	};
	const handleClose = () => setopenPopup(false);
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
			<Modal 
				size="lg" 
				aria-labelledby="example-custom-modal-styling-title"
				show={openPopup} 
				onHide={handleClose} 
				centered>
				<Modal.Header closeButton>
					<Modal.Title id="example-custom-modal-styling-title">Appointment Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row style={{margin:"1rem"}}>
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
						<Row style={{margin:"1rem"}}>
							<Form.Group as={Col}>
								<Form.Label>Patient ID:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.patient_id}
									disabled={true}
								/>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Patient Name:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.patient_name}
									disabled={true}
								/>
							</Form.Group>
						</Row>
						<Row style={{margin:"1rem"}}>
							<Form.Group as={Col}>
								<Form.Label>Doctor ID:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.doctor_id}
									disabled={true}
								/>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Doctor Name:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.doctor_name}
									disabled={true}
								/>
							</Form.Group>
						</Row>
						<Row style={{margin:"1rem"}}>
							{/* <Form.Group as={Col}>
								<Form.Label>Appointment Date:</Form.Label>
								<Form.Control
									type='text'
									value={docschedule.length > 0 ? new Date(docschedule[0].start_time).toLocaleDateString() : ""}
									disabled={true}
								/>
							</Form.Group> */}
							<Form.Group as={Col}>
								<Form.Label>Appointment Time:</Form.Label>
								<DropdownButton menuVariant="dark" size="sm" variant="secondary" title={selectedtime}>
									{docschedule.map((ds) => (
										<Dropdown.Item onClick={(e) => setselectedtime(e.target.value)}>
											{ds.start_time} - {ds.end_time}
										</Dropdown.Item>
									))}
								</DropdownButton>
							</Form.Group>
						</Row>
						<div className="text-center" style={{margin: "1rem"}}>
							<Button variant="outline-dark" block size='sm' type='submit'>
								Submit
							</Button>	
						</div>
					</Form>
					{/* <div style={{display: "inline"}}>
						<div style={{width: "50%", display: 'inline-block', float:'left', marginRight: '10px'}}>
							<h6 style={{display:"inline", margin:"1rem 1rem"}}>Case ID:</h6>
							<input 
								style={{margin:"1rem 1rem"}}
								type='text'
								value={selectedAP.case_id}
								disabled={true}
							/> 
						</div>
						<div style={{width: "50%", display: 'inline-block', float:'left', marginRight: '10px'}}> 
							<h6 style={{display:"inline", margin:"1rem 1rem"}}>Patient Name:</h6>
							<input 
								style={{margin:"1rem 1rem"}}
								type='text'
								value={selectedAP.patient_name}
								disabled={true}
							/>
						</div>
						
					</div>
					<div>
						<h6 style={{display:"inline", margin:"1rem 1rem"}}>Patient Name:</h6>
						<input 
							style={{margin:"1rem 1rem"}}
							type='text'
							value={selectedAP.patient_name}
							disabled={true}
						/> 
					</div> */}
				</Modal.Body>
				{/* {docschedule.map((ds) => (
					<Modal.Body>
						
					</Modal.Body>
				))} */}
			</Modal>	
		</div>
	);
}

export default Appointment;
