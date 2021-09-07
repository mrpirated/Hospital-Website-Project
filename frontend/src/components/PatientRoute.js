import React from "react";
import { Route, Redirect } from "react-router-dom";
import store from "../store/configureStore";

export default function PatientRoute({ component: Component, ...rest }) {
	const isauth = store.getState().auth.isauth;
	const type = store.getState().auth.type;
	return (
		<Route
			{...rest}
			render={(props) => {
				return isauth && type === 0 ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				);
			}}
		></Route>
	);
}
