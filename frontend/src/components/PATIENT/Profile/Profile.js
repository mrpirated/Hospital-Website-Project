import React, { useState } from "react";
import { Nav, Tabs, Tab, Row, Col, NavItem } from "react-bootstrap";
import ProfileInfo from "./ProfileInfo";
import LoginInfo from "./LoginInfo";
//import { Link } from "react-router-dom";
function Profile() {
	const [key, setKey] = useState("profile");
	return (
		<div className='profile'>
			{/* <div>
				<Tabs
					id='tab'
					activeKey={key}
					onSelect={(k) => setKey(k)}
					className='mb-3'
					style={{ flexDirection: "column" }}
				>
					<Tab eventKey='profile' title='Profile'>
						Profile
					</Tab>
					<Tab eventKey='profile2' title='profile2'>
						New Tab
					</Tab>
				</Tabs>
			</div> */}
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
							</Tab.Content>
						</div>
					</Col>
				</Row>
			</Tab.Container>
		</div>
	);
}

export default Profile;
