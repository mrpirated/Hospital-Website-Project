import React, { useState } from "react";
import { Tabs, Tab, Card } from "react-bootstrap";
import moment from "moment";
export default function TabComponent(props) {
	const [key, setKey] = useState(props.selectedKey);
	console.log(props.all);
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
						<div id='card'>
							<Card>
								<Card.Header>
									<h5>Doctor: {c.doctor_name}</h5>
									<h6>
										Date: {new Date(c.start_time).toString().slice(0, 15)}
									</h6>
								</Card.Header>
								<Card.Body>
									<span style={{ fontSize: "18px" }}>
										From: {moment(c.start_time).format("hh:mm A")}
									</span>
									<span style={{ fontSize: "18px", float: "right" }}>
										To: {moment(c.end_time).format("hh:mm A")}
									</span>

									<div>Description: {c.case_description}</div>
								</Card.Body>
							</Card>
						</div>
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
