import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<>
			<nav className="navbar">
			<h1 className="header"> NC News</h1>
				<ul>
					<Link to="/">
						<li>Home</li>
					</Link>
					<Link to="/">
						<li>New Article</li>
					</Link>
					<Link to="/">
						<li>Users</li>
					</Link>
					<Link to="/">
						<li>My Account</li>
					</Link>
				</ul>
			</nav>
			</>
	);
}

export default Navbar;
