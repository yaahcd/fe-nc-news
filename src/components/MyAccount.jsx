import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import BlogContext from '../contexts/BlogContext';
import { getUserByUsername } from '../api';

function MyAccount() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const { user, setUser } = useContext(BlogContext);
	const [userInfo, setUserInfo] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setError(false);
		getUserByUsername(user)
			.then((user) => {
				setUserInfo(user[0]);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(true);
				setIsLoading(false);
			});
	}, []);

	const handleClick = () => {
		setUser(null);
    localStorage.clear();
		navigate('/');
	};

	if (error) {
		return (
			<p className="errorMessage">Something went wrong. Please try again.</p>
		);
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<main className="userContainer">
			<h2>Hello {userInfo.name}! 😄</h2>
			<img src={userInfo.avatar_url} alt="" />
			<button onClick={handleClick} className="btn">
				Logout
			</button>
		</main>
	);
}

export default MyAccount;
