import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
	return (
		<nav className="Sidebar">
			<NavLink
				exact
				activeClassName="Sidebar__item--active"
				to="/"
				className="Sidebar__item">
				Home
			</NavLink>
			<NavLink
				exact
				activeClassName="Sidebar__item--active"
				to="/categories"
				className="Sidebar__item">
				Categories
			</NavLink>
		</nav>
	);
}

export default Sidebar;
