import { useEffect, useState } from 'react';
import { getArticles } from '../api';
import Article from './Article';
import Loading from './Loading';
import SearchBar from './SearchBar';

function ListOfArticles() {
	const [articlesList, setArticlesList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getArticles()
			.then(({ articles }) => {
				setArticlesList(articles);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
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
			<SearchBar setArticlesList={setArticlesList} />
			<ul className="articlesList">
				{articlesList.length === 0 ? (
					<p>No articles on this topic.</p>
				) : (
					articlesList.map((article) => {
						return <Article key={article.article_id} article={article} />;
					})
				)}
			</ul>
		</>
	);
}

export default ListOfArticles;
