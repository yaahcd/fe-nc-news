import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import SingleArticle from './components/SingleArticle';
import ListOfArticles from './components/ListOfArticles'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<ListOfArticles />} />
				<Route path="/articles/:article_id" element={<SingleArticle />} />
			</Routes>
			<Navbar />
		</>
	);
}

export default App;
