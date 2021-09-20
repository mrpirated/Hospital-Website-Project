import React, {useState} from "react";
import { useHistory } from "react-router";
import {Button} from "react-bootstrap";
//import {DayPilotScheduler} from "daypilot-pro-react";
import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective} from "@syncfusion/ej2-react-schedule";

function Appointment() {
	const history = useHistory();
	
	const onclickfunc = () => {
		console.log("HELLO");
	}
	var localData = {
		dataSource: [{
			Subject: "Hello",
			EndTime: new Date(2021, 8, 20, 15, 0),
			StartTime: new Date(2021,8, 20, 14, 0),
		},
		{
			Subject: "Hello",
			EndTime: new Date(2021, 8, 20, 16, 0),
			StartTime: new Date(2021,8, 20, 15, 0)
		}]
	}

	return (
		<div>
		{console.log(new Date(2021, 8, 20, 14, 0))}
			<ScheduleComponent currentView='Day' eventSettings={localData} readonly={true}>
				<ViewsDirective>
					<ViewDirective option='Day'/>
				</ViewsDirective>
				<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
			</ScheduleComponent>
		</div>
	);
}

export default Appointment;
