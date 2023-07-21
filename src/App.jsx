import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SingleArticle from './components/SingleArticle';
import ListOfArticles from './components/ListOfArticles';
import PrivateRoute from './components/PrivateRoute';
import MyAccount from './components/MyAccount';
import SignIn from './components/SignIn';
import UserHeader from './components/UserHeader';
import { BlogProvider } from './contexts/BlogContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

	return (
		<BlogProvider>
			<Navbar />
			<UserHeader />
			<Routes>
				<Route path="/" element={<ListOfArticles />} />
				<Route path="/articles/:article_id" element={<SingleArticle />} />
				<Route path="/my_account" element={<PrivateRoute />}>
					<Route path="/my_account" element={<MyAccount />} />
				</Route>
				<Route path="/sign_in" element={<SignIn/>} />
			</Routes>
			<ToastContainer />
		</BlogProvider>
	);
}

export default App;
