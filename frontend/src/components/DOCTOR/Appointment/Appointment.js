import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
	Inject,
	ScheduleComponent,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
	EventSettingsModel,
	ViewsDirective,
	ViewDirective,
	ResourcesDirective,
	ResourceDirective,
} from "@syncfusion/ej2-react-schedule";

function Appointment() {
	const history = useHistory();
	var localData = {
		dataSource: [
			{
				id: 1,
				Subject: "Hello",
				EndTime: new Date(2021, 8, 20, 15, 0),
				StartTime: new Date(2021, 8, 20, 14, 0),
			},
			{
				id: 2,
				Subject: "Hello",
				EndTime: new Date(2021, 8, 20, 16, 0),
				StartTime: new Date(2021, 8, 20, 15, 0),
			},
		],
	};

	const onPopupOpen = (args) => {
		history.push("/home", { data: args.data });
	};

	return (
		<div>
			{/* <ButtonComponent id='btn1' title='Click to open Editor' onClick={this.onClickButton1.bind(this)}>Click to open Editor</ButtonComponent> */}
			<ScheduleComponent
				currentView='Day'
				eventSettings={localData}
				readonly={true}
				popupClose={onPopupOpen}
			>
				<ViewsDirective>
					<ViewDirective option='Day' />
				</ViewsDirective>
				<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
			</ScheduleComponent>
		</div>
	);
}

export default Appointment;
