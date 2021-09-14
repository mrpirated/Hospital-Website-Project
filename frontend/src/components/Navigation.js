import React, { useState } from "react";

import { Navbar, Container, Nav } from "react-bootstrap";
import { useStore } from "react-redux";
import { loggedOut } from "../store/auth";
import { Link } from "react-router-dom";
function Navigation(props) {
	const store = useStore();
	//console.log(store);

	const [isauth, setisauth] = useState(store.getState().auth.isauth);
	store.subscribe(() => setisauth(store.getState().auth.isauth));
	const logout = () => {
		store.dispatch(loggedOut());
	};

	return (
		<>
			<Navbar bg='light' expand='lg'>
				<Container>
					<Navbar.Brand href='home'>Ayurveda</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link as={Link} to='about'>
								About Us
							</Nav.Link>
							{props.Navitems &&
								props.Navitems.map((item) => (
									<Nav.Link as={Link} to={item.url + "/" + item.path}>
										{item.name}
									</Nav.Link>
								))}
						</Nav>
						<Nav className='ml-auto'>
							{!isauth && (
								<Nav.Link as={Link} to='login'>
									Login
								</Nav.Link>
							)}
							{!isauth && (
								<Nav.Link as={Link} to='signup'>
									Signup
								</Nav.Link>
							)}
							{isauth && (
								<Nav.Link as={Link} to='/profile'>
									Hello {store.getState().auth.user.first_name}
								</Nav.Link>
							)}
							{isauth && (
								<Nav.Link href='/home' onClick={logout}>
									Logout
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default Navigation;