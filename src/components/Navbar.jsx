import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<footer className="navbar">
			<nav className="navbarNav">
				<ul className="navbarList">
					<Link to="/">
						<li className="navbarItem">Home</li>
					</Link>
					<Link to="/">
						<li className="navbarItem">New Article</li>
					</Link>
					<Link to="/">
						<li className="navbarItem">Users</li>
					</Link>
					<Link to="/">
						<li className="navbarItem">My Account</li>
					</Link>
				</ul>
			</nav>
		</footer>
	);
}

export default Navbar;
