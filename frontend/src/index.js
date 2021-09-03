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
store.dispatch(loginPending());
store.dispatch(
	loggedIn({
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50X2lkIjozNSwiZmlyc3RfbmFtZSI6InRtcCIsImxhc3RfbmFtZSI6InRtcCIsImRvYiI6IjE5OTQtMDgtMTRUMTg6MzA6MDAuMDAwWiIsImdlbmRlciI6Im1hbGUiLCJhZGRyZXNzIjoiYWRkcmVzcyIsImVtYWlsIjoidG1wMTIzQGdtYWlsLmNvbSIsInBob25lIjoiODg4ODg4OCIsImlhdCI6MTYzMDY3NTE2NywiZXhwIjoxNjMzMjY3MTY3fQ.Cscy5vfJTILyUyJ7BQBSuEUBMkSq7-oP9bjRzRhgKz4",
		user: {
			id: 35,
			type: 1,
			first_name: "tmp",
			last_name: "tmp",
			dob: "1994-08-14T18:30:00.000Z",
			gender: "male",
			address: "address",
			email: "tmp123@gmail.com",
			phone: "8888888",
			//password": "$2b$10$uintCDK9iVRmTTv84uGyouWd6WbMyLe9af3QBlwyJwyUjlpMXedTC"
		},
	})
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
