import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
function App() {
	return (
		<Router>
			<div className='App'>
				<section>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/signup' component={Signup} />
					</Switch>
				</section>
			</div>
		</Router>
	);
}

export default App;
