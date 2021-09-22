import React, { useEffect, useState } from "react";
import remaining_appointmentAPI from "../../../api/remaining_appointmentAPI";
import adminDoctorScheduleAPI from "../../../api/adminDoctorScheduleAPI";
import { Card, Modal, DropdownButton, Dropdown, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import DataTable from "../../DataTable";
import "./Appointment.css";
import { Route, Switch, useRouteMatch, useHistory } from "react-router";
function Appointment() {
	const token = useSelector((state) => state.auth.token);
	const [appointments, setappointments] = useState([]);
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
	const onSaveChanges = async () => {
		setopenPopup(false);
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
				<DropdownButton
					title={
						selectedtime != "Select Time"
							? "From :" +
							  selectedtime.start_time.substr(0, 28) +
							  " To: " +
							  selectedtime.end_time.substr(0, 28)
							: selectedtime
					}
				>
					{docschedule.map((ds) => {
						var st = new Date(ds.start_time);
						var et = new Date(ds.end_time);
						return (
							<Dropdown.Item
								onClick={(e) => {
									console.log(e.target.value);
									setselectedtime(ds);
								}}
							>
								<div>
									From: {st.toDateString()} {st.toTimeString().substring(0, 12)}
								</div>
								<div>
									To :{et.toDateString()} {et.toTimeString().substring(0, 12)}
								</div>
							</Dropdown.Item>
						);
					})}
				</DropdownButton>
				{/* {docschedule.map((ds) => (
					<Modal.Body>
						
					</Modal.Body>
				))} */}
				<Modal.Footer>
					<Button onClick={onSaveChanges}>Save Changes</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Appointment;
