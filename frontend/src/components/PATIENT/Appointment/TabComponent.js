import React, { useState } from "react";
import { Tabs, Tab, Table, Modal } from "react-bootstrap";
import moment from "moment";
function TabComponent(props) {
	const [key, setKey] = useState(props.selectedKey);
	return (
		<div>
			<Tabs activeKey={key} onSelect={(k) => setKey(k)} className='mb-3'>
				{props.tabList.map((item) => (
					<Tab eventKey={item.eventKey} title={item.title}>
						<Table striped bordered hover responsive='lg'>
							<thead style={{ textAlign: "center" }}>
								<th>Doctor Name</th>
								<th>Case Description</th>
								<th>Date</th>
								<th>Start Time</th>
								<th>End Time</th>
								<th>Duration</th>
								<th>Preferred Date</th>
							</thead>
							<tbody style={{ textAlign: "center" }}>
								{(item.eventKey === "all"
									? props.all
									: item.eventKey === "future"
									? props.future
									: props.past
								).map((c) => (
									<tr key={c.appointment_id}>
										<td>{c.doctor_name}</td>
										<td>{c.case_description}</td>
										<td>{moment(c.start_time).format("ll")}</td>
										<td>{moment(c.start_time).format("HH:mm A")}</td>
										<td>{moment(c.end_time).format("HH:mm A")}</td>
										<td>
											{moment(c.end_time).diff(moment(c.start_time), "minutes")}{" "}
											min
										</td>
										<td>{moment(c.preferred_date).format("ll")}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Tab>
				))}
				<Tab eventKey='unset' title='Pending Appointment'>
					<Table striped bordered hover responsive='lg'>
						<thead style={{ textAlign: "center" }}>
							<th>Doctor Name</th>
							<th>Case Description</th>
							<th>Preferred Date</th>
						</thead>
						<tbody style={{ textAlign: "center" }}>
							{props.unset.map((c) => (
								<tr key={c.appointment_id}>
									<td>{c.doctor_name}</td>
									<td>{c.case_description}</td>
									<td>{moment(c.preferred_date).format("ll")}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Tab>
			</Tabs>
		</div>
	);
}

export default TabComponent;