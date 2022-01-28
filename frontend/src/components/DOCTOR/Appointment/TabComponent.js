import React, { useState } from "react";
import { Tabs, Tab, Table, Modal } from "react-bootstrap";
import moment from "moment";
function TabComponent(props) {
	const [key, setKey] = useState(props.selectedKey);
	return (
		<div>
			<Tabs
				id='tab'
				activeKey={key}
				onSelect={(k) => setKey(k)}
				className='mb-3'
			>
				{props.tabList.map((item) => (
					<Tab eventKey={item.eventKey} title={item.title}>
						<Table striped bordered hover responsive='lg'>
							<thead>
								<th>Patient Name</th>
								<th>Case Description</th>
								<th>Start Time</th>
								<th>End Time</th>
								<th>Duration</th>
							</thead>
							<tbody>
								{(item.eventKey === "all"
									? props.all
									: item.eventKey === "future"
									? props.future
									: props.past
								).map((c) => (
									<tr key={c.appointment_id}>
										<td>{c.patient_name}</td>
										<td>{c.case_description}</td>
										<td>{moment(c.start_time).format("HH:mm A")}</td>
										<td>{moment(c.end_time).format("HH:mm A")}</td>
										<td>
											{moment(c.end_time).diff(moment(c.start_time), "minutes")}{" "}
											min
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Tab>
				))}
			</Tabs>
		</div>
	);
}

export default TabComponent;
