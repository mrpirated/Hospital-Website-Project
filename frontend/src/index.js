import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
//import App from "./App";
import App from "./App";
import store from "./store/configureStore";
import { SocketProvider } from "./context/SocketContext";
store.subscribe(() => {
	console.log("Store changed!");
	console.log(store.getState());
});

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<SocketProvider>
				<App />
			</SocketProvider>
		</Provider>
	</Router>,
	document.getElementById("root")
);
// module.exports = {
// 	resolve: {
// 		extensions: [".js", ".jsx", ".json", ".ts", ".tsx"], // other stuff
// 		fallback: {
// 			fs: false,
// 			path: require.resolve("path-browserify"),
// 		},
// 	},
// };
