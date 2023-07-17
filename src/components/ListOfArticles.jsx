import { useEffect, useState } from 'react';
import { getArticles } from '../api';
import Article from './Article';
import Loading from './Loading';


function ListOfArticles() {

	const [articlesList, setArticlesList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)


	useEffect(() => {
		getArticles()
			.then(({ articles }) => {
				setArticlesList(articles);
				setIsLoading(false);
			})
			.catch((err) => {
				setArticlesList([]);
				setError(err);
				setIsLoading(false);
			});
	}, []);

	if (error) {
		return (
			<div className="errorMessage">
				<h1>{JSON.stringify(error.message)}</h1>
			</div>
		);
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="articlesList">
			{articlesList.map((article) => {
				return <Article key={article.article_id} article={article} />;
			})}
		</div>
	);
}

export default ListOfArticles;
