import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//import App from "./App";
import App from "./App";
import store from "./store/configureStore";
import { SocketProvider } from "./context/SocketContext";
store.subscribe(() => {
	console.log("Store changed!");
	console.log(store.getState());
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<SocketProvider>
					<App />
				</SocketProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
