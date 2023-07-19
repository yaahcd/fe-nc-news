import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import SingleArticle from './components/SingleArticle';
import ListOfArticles from './components/ListOfArticles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BlogProvider } from './contexts/BlogContext';

function App() {
	return (
		<BlogProvider>
			<Header />
			<Routes>
				<Route path="/" element={<ListOfArticles />} />
				<Route path="/articles/:article_id" element={<SingleArticle />} />
			</Routes>
			<Navbar />
			<ToastContainer />
		</BlogProvider>
	);
}

export default App;
