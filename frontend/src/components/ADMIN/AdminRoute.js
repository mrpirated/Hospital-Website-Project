import React, {useEffect} from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { useStore } from "react-redux";
import { Switch, useHistory } from "react-router";

import Navigation from "../Navigation";
export default function AdminRoute() {
	const store = useStore();
	const auth = store.getState().auth;
	console.log(auth);
	const isauth = auth.isauth;
	const type = auth.type;
	const history = useHistory();
	//console.log(isauth);
	useEffect(() => {
		if (!(isauth && type === 2)) {
			history.push("/admin/login");
		}
	});
	return (
		<Router>
			<Navigation />
		</Router>
	);
}
