import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useStore } from "react-redux";
import { loggedOut } from "../store/auth";
import { Link } from "react-router-dom";
function Navigation(props) {
	const store = useStore();
	//console.log(store);
	const navigate = useNavigate();
	const [isauth, setisauth] = useState(store.getState().auth.isauth);
	store.subscribe(() => setisauth(store.getState().auth.isauth));
	const logout = () => {
		//sessionStorage.setItem("lastPage", "/home");
		store.dispatch(loggedOut());
		navigate("home");
	};
	const account_type = store.getState().auth.type;

	return (
		<>
			<Navbar className='navbar' expand='lg'>
				<Container>
					<Navbar.Brand
						style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "2rem" }}
						onClick={() => {
							navigate("home");
						}}
					>
						Ayurveda
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							{/* <Nav.Link as={Link} to='about'>
								About Us
							</Nav.Link> */}
							{props.Navitems &&
								props.Navitems.map((item) => (
									<Nav.Link
										style={{ color: "#FFFFFF" }}
										as={Link}
										to={item.url + "/" + item.path}
										key={item.url + "/" + item.path}
									>
										{item.name}
									</Nav.Link>
								))}
							{/* <Nav.Link style={{ color: "#FFFFFF" }} as={Link} to={"meeting"}>
								Meeting
							</Nav.Link> */}
						</Nav>
						<Nav className='ml-auto'>
							{!isauth && (
								<Nav.Link style={{ color: "#FFFFFF" }} as={Link} to='/login'>
									Login
								</Nav.Link>
							)}
							{!isauth && (
								<Nav.Link style={{ color: "#FFFFFF" }} as={Link} to='/signup'>
									Register
								</Nav.Link>
							)}
							{isauth && (
								<Nav.Link
									style={{ color: "#FFFFFF" }}
									as={Link}
									to={"/" + account_type + "/profile"}
								>
									Hello {store.getState().auth.user.first_name}
								</Nav.Link>
							)}
							{isauth && (
								<Nav.Link
									style={{ color: "#FFFFFF" }}
									// href='/home'
									onClick={logout}
								>
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
