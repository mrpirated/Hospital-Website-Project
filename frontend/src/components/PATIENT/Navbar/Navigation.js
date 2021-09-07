import React, { useState } from "react";

import { Navbar, Container, Nav } from "react-bootstrap";
import { loggedOut } from "../../../store/auth";
import store from "../../../store/configureStore";
const logout = () => {
	store.dispatch(loggedOut());
};

function Navigation() {
	const [isauth, setisauth] = useState(store.getState().auth.isauth);
	store.subscribe(() => setisauth(store.getState().auth.isauth));
	return (
		<>
			<Navbar bg='light' expand='lg'>
				<Container>
					<Navbar.Brand href='home'>Ayurveda</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link href='about'>About Us</Nav.Link>
							<Nav.Link href='doctors'>Doctors</Nav.Link>
							<Nav.Link href='appointment'>Appointment</Nav.Link>
						</Nav>
						<Nav className='ml-auto'>
							{!isauth && <Nav.Link href='login'>Login</Nav.Link>}
							{!isauth && <Nav.Link href='signup'>Signup</Nav.Link>}
							{isauth && (
								<Nav.Link href='/profile'>
									Hello {store.getState().auth.user.first_name}
								</Nav.Link>
							)}
							{isauth && <Nav.Link onClick={logout}>Logout</Nav.Link>}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default Navigation;
