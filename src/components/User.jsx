function User({ user }) {
	return (
		<li className="userItem">
				<img
					className="userImg"
					src={user.avatar_url}
					alt={`Image for ${user.name}`}
				/>
				<h3>{user.username}</h3>
        <h3>{user.name}</h3>
		
		</li>
	);
}

export default User;
