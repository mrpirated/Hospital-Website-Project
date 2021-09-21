import React, { useEffect, useState } from "react";
import remaining_appointmentAPI from "../../../api/remaining_appointmentAPI";
import adminDoctorScheduleAPI from "../../../api/adminDoctorScheduleAPI";
import { Card, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Popup from "./Popup";
import "./Appointment.css";
import { Route, Switch, useRouteMatch, useHistory } from "react-router";
function Appointment() {
	const token = useSelector((state) => state.auth.token);
	const [appointments, setappointments] = useState([]);
	const [openPopup, setopenPopup] = useState(false);
	const [selectedAP, setselectedAP] = useState({});
	const [docschedule, setdocschedule] = useState([]);
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
			<Modal show={openPopup} onHide={handleClose} size='lg' centered>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>{selectedAP.patient_name}</Modal.Body>
				{docschedule.map((ds) => (
					<Modal.Body>
						{ds.start_time} {ds.end_time}
					</Modal.Body>
				))}
			</Modal>
		</div>
	);
}

export default Appointment;
