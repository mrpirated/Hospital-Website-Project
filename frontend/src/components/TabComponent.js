import React, { useState } from "react";
import { Tabs, Tab, Card } from "react-bootstrap";
import "./TabComponent.css";

export default function TabComponent(props) {
	const [key, setKey] = useState(props.selectedKey);

	return (
		<Tabs id='tab' activeKey={key} onSelect={(k) => setKey(k)} className='mb-3'>
			{props.tabList.map((item) => (
				<Tab eventKey={item.eventKey} title={item.title}>
					{(item.eventKey === "all"
						? props.all
						: item.eventKey === "future"
						? props.future
						: props.past
					).map((c) => (
						<Card style={{ margin: "3% 5%" }}>
							<Card.Header
								style={{ display: "flex", justifyContent: "space-between" }}
							>
								<h6>Case ID: {c.case_id}</h6>
								<h6>Appointment ID: {c.appointment_id}</h6>
							</Card.Header>
							<Card.Body
								style={{ display: "flex", justifyContent: "space-between" }}
							>
								<Card.Text>Start Time: {c.start_time}</Card.Text>
								<Card.Text>End Time: {c.end_time}</Card.Text>
							</Card.Body>
						</Card>
					))}
				</Tab>
			))}
			{/* <Tab eventKey="home" title="Home">
            </Tab>
            <Tab eventKey="profile" title="Profile">
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
            </Tab> */}
		</Tabs>
	);
}
