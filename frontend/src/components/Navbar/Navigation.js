import React from "react";

import { Navbar, Container, Nav } from "react-bootstrap";
function Navigation() {
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
							<Nav.Link href='login'>Login</Nav.Link>
							<Nav.Link href='signup'>Signup</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default Navigation;
