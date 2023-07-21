import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<>
			<nav className="navbar">
			<Link to="/">
				<h1 className="header"> NC News</h1>
			</Link>
				<ul>
					<Link to="/">
						<li>Home</li>
					</Link>
					<Link to="/post_article">
						<li>New Article</li>
					</Link>
					<Link to="/users">
						<li>Users</li>
					</Link>
					<Link to="/my_account">
						<li>My Account</li>
					</Link>
				</ul>
			</nav>
			</>
	);
}

export default Navbar;
