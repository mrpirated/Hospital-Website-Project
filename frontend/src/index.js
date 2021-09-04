import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/configureStore";
import { loggedIn, loggedOut, loginPending } from "./store/auth";

store.subscribe(() => {
	console.log("Store changed!");
	console.log(store.getState());
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
