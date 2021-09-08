import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//import App from "./App";
import App from "./App";
import store from "./store/configureStore";
import tokenAPI from "./api/tokenAPI";
import { loggedWithToken } from "./store/auth";
console.log(store.getState());
store.subscribe(() => {
	console.log("Store changed!");
	console.log(store.getState());
});

if (localStorage.getItem("token")) {
	tokenAPI(JSON.parse(localStorage.getItem("token"))).then((res) => {
		//console.log(res);
		store.dispatch(loggedWithToken(res));
	});
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
