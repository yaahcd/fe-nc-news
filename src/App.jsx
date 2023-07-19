import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import SingleArticle from './components/SingleArticle';
import ListOfArticles from './components/ListOfArticles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InvalidPath from './components/InvalidPath';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<ListOfArticles />} />
				<Route path="/articles/:article_id" element={<SingleArticle />} />
				<Route path="*" element={<InvalidPath />} />
			</Routes>
			<Navbar />
			<ToastContainer />
		</>
	);
}

export default App;
