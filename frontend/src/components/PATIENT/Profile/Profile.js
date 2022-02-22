import React, { useState } from "react";
import { Nav, Tabs, Tab, Row, Col, NavItem, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { alertRemoved } from "../../../store/alert";
import ProfileInfo from "./ProfileInfo";
import LoginInfo from "./LoginInfo";
import VerifyEmail from "./VerifyEmail";
//import { Link } from "react-router-dom";
function Profile() {
	const [eventKey, setEventKey] = useState("profile");
	const alert = useSelector((state) => state.alert);
	const dispatch = useDispatch();
	return (
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
									<Nav.Link eventKey='verifyEmail'>Verify Email</Nav.Link>
								</Nav.Item>
								{/* <Nav.Item>
									<Nav.Link eventKey='phone'>Change Phone No.</Nav.Link>
								</Nav.Item> */}
							</Nav>
						</div>
					</Col>
					<Col sm={9}>
						<div style={{ margin: "1%" }}>
							<Tab.Content>
								<Tab.Pane eventKey='profile'>
									<ProfileInfo />
								</Tab.Pane>
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
	);
}

export default Profile;
