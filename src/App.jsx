import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SingleArticle from './pages/SingleArticle';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/articles/:article_id" element={<SingleArticle />} />
			</Routes>
			<Navbar />
		</>
	);
}

export default App;
