import { useContext } from 'react';
import { Link } from 'react-router-dom';
import BlogContext from '../contexts/BlogContext';

function UserHeader() {
	const { user } = useContext(BlogContext);
	return user ? (
		<p className="userHeader">Hello {user}!</p>
	) : (
		<Link to="/sign_in" className="userHeader">
			Sign-in
		</Link>
	);
}

export default UserHeader;
