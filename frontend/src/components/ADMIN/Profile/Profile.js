import React, { useState, useEffect } from "react";
import getProfilePicAPI from "../../../api/getProfilePicAPI";
import { useSelector, useDispatch } from "react-redux";
import { alertRemoved } from "../../../store/alert";
import { Nav, Col, Row, Tab, Alert } from "react-bootstrap";
import doctor_image from "../../../images/doctor.jpg";
import ProfileInfo from "./ProfileInfo";
import LoginInfo from "./LoginInfo";
import VerifyEmail from "./VerifyEmail";
function Profile() {
	const auth = useSelector((state) => state.auth);
	const alert = useSelector((state) => state.alert);
	const dispatch = useDispatch();

	const [eventKey, setEventKey] = useState("login");

	return (
		<div>
			<div
				className='profile'
				onClick={() => {
					dispatch(alertRemoved());
				}}
			>
				<div style={{ textAlign: "center", padding: "20px" }}>
					<h1>Profile</h1>
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
								<div style={{ margin: "5% 0", fontSize: "1.3rem" }}>
									<b>
										{auth.user.first_name} {auth.user.last_name}
									</b>
								</div>

								<Nav
									variant='pills'
									className='flex-column'
									style={{ position: "relative" }}
								>
									{/* <Nav.Item>
										<Nav.Link eventKey='profile'>Profile</Nav.Link>
									</Nav.Item> */}
									<Nav.Item>
										<Nav.Link eventKey='login'>Login</Nav.Link>
									</Nav.Item>

									<Nav.Item>
										<Nav.Link eventKey='verifyEmail'>Verify Email</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
						</Col>
						<Col sm={9}>
							<div style={{ margin: "1%" }}>
								<Tab.Content>
									{/* <Tab.Pane eventKey='profile'>
										<ProfileInfo
										// profilePicChange={profilePicChange}
										// setProfilePicChange={setProfilePicChange}
										/>
									</Tab.Pane> */}
									<Tab.Pane eventKey='login'>
										<LoginInfo />
									</Tab.Pane>

									<Tab.Pane eventKey='verifyEmail'>
										<VerifyEmail eventKey={eventKey} />
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
