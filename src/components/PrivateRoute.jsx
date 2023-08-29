import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import PageContext from "../context/PageContext";

function PrivateRoute() {
	const { user } = useContext(PageContext);

	return user ? (
		<Outlet />
	) : (
		<Navigate to="/sign_in" />
	);
}

export default PrivateRoute;