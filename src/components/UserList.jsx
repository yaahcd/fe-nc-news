import { useEffect, useState } from 'react';
import { getUsers } from '../api';
import User from './User';
import Loading from './Loading';


function UserList() {
	const [usersList, setUsersList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getUsers()
			.then(({ users }) => {
				setUsersList(users);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(true);
				setIsLoading(false);
			});
	}, []);

	if (error) {
		return (
			<p className="errorMessage"> Something went wrong. Please try again.</p>
		);
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<ul className="usersList">
				{usersList.length === 0 ? (
					<p>No users to show.</p>
				) : (
					usersList.map((user) => {
						return <User key={user.user_id} user={user} />;
					})
				)}
			</ul>
		</>
	);
}

export default UserList;
