import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective} from "@syncfusion/ej2-react-schedule";

function SchedulerComponent(props) {

    return (
		<div>
			{/* <ButtonComponent id='btn1' title='Click to open Editor' onClick={this.onClickButton1.bind(this)}>Click to open Editor</ButtonComponent> */}
			<ScheduleComponent currentView='Day' eventSettings={props.localData} 
			readonly={true} popupOpen={props.onPopupOpen}>
				<ViewsDirective>
					<ViewDirective option='Day'/>
					<ViewDirective option='Week'/>
					<ViewDirective option='Month'/>
				</ViewsDirective>
				{/* <ViewsDirective>
				</ViewsDirective>
				<ViewsDirective>
				</ViewsDirective> */}
				<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
			</ScheduleComponent>
		</div>
	);
}

export default SchedulerComponent;