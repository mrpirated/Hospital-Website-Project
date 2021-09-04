import React from "react";
import * as FaIcons from "react-icons/fa";
export const SidebarData = [
	{
		title: "My Profile",
		path: "profile",
		icon: <FaIcons.FaUser />,
		cName: "nav-text",
	},
	{
		title: "Home",
		path: "/",
		icon: <FaIcons.FaHome />,
		cName: "nav-text",
	},
	{
		title: "About Us",
		path: "/aboutus",
		icon: <FaIcons.FaInfo />,
		cName: "nav-text",
	},
	{
		title: "Doctors",
		path: "/doctors",
		icon: <FaIcons.FaStethoscope />,
		cName: "nav-text",
	},
];
