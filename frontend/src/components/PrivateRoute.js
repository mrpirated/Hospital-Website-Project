import React from "react";
import { Route, Redirect } from "react-router-dom";
import store from "../store/configureStore";

export default function PrivateRoute({ component: Component, ...rest }) {
	const isauth = store.getState().auth.isauth;

	return (
		<Route
			{...rest}
			render={(props) => {
				return isauth ? <Component {...props} /> : <Redirect to='/login' />;
			}}
		></Route>
	);
}
