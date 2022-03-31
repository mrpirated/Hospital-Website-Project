import React, { useState, useEffect } from "react";
import getProfilePicAdminAPI from "../../../api/getProfilePicAdminAPI";
import { useSelector, useDispatch } from "react-redux";
import { alertRemoved } from "../../../store/alert";
import { Nav, Col, Row, Tab, Alert } from "react-bootstrap";
import doctor_image from "../../../images/doctor.jpg";
import { useLocation, useNavigate } from "react-router";
import AddQualification from "./AddQualification";
import AppointmentTime from "./AppointmentTime";
import AddSpecialization from "./AddSpecialization";
import AddAvailability from "./AddAvailability";
import { Navigate } from "react-router";
function EditDoctor() {
	const auth = useSelector((state) => state.auth);
	const alert = useSelector((state) => state.alert);
	const dispatch = useDispatch();
	const [profilePic, setProfilePic] = useState();
	const [profilePicChange, setProfilePicChange] = useState(false);
	const [eventKey, setEventKey] = useState("profile");
	const location = useLocation();
	const navigate = useNavigate();
	const { doctorDetails } = location.state;
	useEffect(() => {
		getProfilePicAdminAPI({
			token: auth.token,
			doctor_id: doctorDetails.doctor_id,
		}).then((response) => {
			if (response.success) {
				console.log(response);
				setProfilePic(response.data.image.data);
			}
			setProfilePicChange(false);
		});
	}, [profilePicChange, auth.isauth]);

	// console.log(location);
	// console.log(doctorDetails);
	// if (location.state === null || !location.state.doctorDetails) {
	// 	return <Navigate to='/admin/home' />;
	// }

	return (
		<div>
			<div
				className='profile'
				onClick={() => {
					dispatch(alertRemoved());
				}}
			>
				<div style={{ textAlign: "center", padding: "20px" }}>
					<h1>Doctor Profile</h1>
					<Alert show={alert.show} variant={alert.variant}>
						{alert.message}
					</Alert>
				</div>
				<Tab.Container
					id='left-tabs-example'
					activeKey={eventKey}
					onSelect={(k) => setEventKey(k)}
				>
					<Row style={{ flexDirection: "row" }}>
						<Col sm={3}>
							<div className='profile-left'>
								<img
									src={
										profilePic
											? `data:image/jpeg;base64,${new Buffer.from(
													profilePic
											  ).toString("base64")}`
											: doctor_image
									}
									position='relative'
									width='100%'
									alt='profile_pic'
								/>

								<div style={{ margin: "5% 0", fontSize: "1.3rem" }}>
									<b>
										{doctorDetails.first_name} {doctorDetails.last_name}
									</b>
								</div>

								<Nav
									variant='pills'
									className='flex-column'
									style={{ position: "relative" }}
								>
									<Nav.Item>
										<Nav.Link eventKey='profile'>Profile</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey='changePhone'>Change Phone No.</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey='appointmentTime'>
											Appointment Time
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey='addSpecialization'>
											Add Specialization
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey='addQualification'>
											Add Qualification
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey='addAvailability'>
											Add Availability
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
						</Col>
						<Col sm={9}>
							<div style={{ margin: "1%" }}>
								<Tab.Content>
									<Tab.Pane eventKey='addQualification'>
										<AddQualification
											eventKey={eventKey}
											doctor_id={doctorDetails.doctor_id}
										/>
									</Tab.Pane>
									<Tab.Pane eventKey='appointmentTime'>
										<AppointmentTime
											eventKey={eventKey}
											doctor_id={doctorDetails.doctor_id}
										/>
									</Tab.Pane>
									<Tab.Pane eventKey='addSpecialization'>
										<AddSpecialization
											eventKey={eventKey}
											doctor_id={doctorDetails.doctor_id}
										/>
									</Tab.Pane>
									<Tab.Pane eventKey='addAvailability'>
										<AddAvailability
											eventKey={eventKey}
											doctor_id={doctorDetails.doctor_id}
										/>
									</Tab.Pane>
								</Tab.Content>
							</div>
						</Col>
					</Row>
				</Tab.Container>
			</div>
		</div>
	);
}

export default EditDoctor;
