import React, { useState, useEffect } from "react";
import getProfilePicAPI from "../../../api/getProfilePicAPI";
import { useSelector } from "react-redux";
import { Nav, Col, Row, Tab } from "react-bootstrap";
import doctor_image from "./doctor.jpg";
import ProfileInfo from "./ProfileInfo";
import LoginInfo from "./LoginInfo";
import ChangePhone from "./ChangePhone";
import AppointmentTime from "./AppointmentTime";
function Profile() {
	const auth = useSelector((state) => state.auth);
	const [profilePic, setProfilePic] = useState();
	const [profilePicChange, setProfilePicChange] = useState(false);
	const [key, setKey] = useState("profile");

	useEffect(() => {
		getProfilePicAPI({ token: auth.token }).then((response) => {
			if (response.success) {
				setProfilePic(response.data.image.data);
			}
			setProfilePicChange(false);
		});
	}, [profilePicChange]);

	return (
		<div>
			<div className='profile'>
				<div style={{ textAlign: "center", padding: "20px" }}>
					<h1>Profile</h1>
				</div>
				<Tab.Container
					id='left-tabs-example'
					activeKey={key}
					onSelect={(k) => setKey(k)}
				>
					<Row style={{ flexDirection: "row" }}>
						<Col sm={3}>
							<div>
								<div style={{ margin: "1%", padding: "5%" }}>
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
								</div>
								<div style={{ textAlign: "center" }}>
									<h3>
										{auth.user.first_name} {auth.user.last_name}
									</h3>
								</div>
								<div style={{ margin: "1%" }}>
									<Nav
										variant='pills'
										className='flex-column'
										style={{ position: "absolute" }}
									>
										<Nav.Item>
											<Nav.Link eventKey='profile'>Profile</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey='login'>Login</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey='changePhone'>
												Change Phone No.
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey='appointmentTime'>
												Appointment Time
											</Nav.Link>
										</Nav.Item>
									</Nav>
								</div>
							</div>
						</Col>
						<Col sm={9}>
							<div style={{ margin: "1%" }}>
								<Tab.Content>
									<Tab.Pane eventKey='profile'>
										<ProfileInfo
											profilePicChange={profilePicChange}
											setProfilePicChange={setProfilePicChange}
										/>
									</Tab.Pane>
									<Tab.Pane eventKey='login'>
										<LoginInfo />
									</Tab.Pane>
									<Tab.Pane eventKey='changePhone'>
										<ChangePhone />
									</Tab.Pane>
									<Tab.Pane eventKey='appointmentTime'>
										<AppointmentTime />
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

export default Profile;
