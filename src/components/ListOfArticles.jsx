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
				setError(err);
				setIsLoading(false);
			});
	}, []);

	if (error) {
		return (
			<section className="errorMessage">
				<p>{error.request.status}: {error.response.data.msg}</p>
			</section>
		);
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<ul className="articlesList">
			{articlesList.map((article) => {
				return <Article key={article.article_id} article={article} />;
			})}
		</ul>
	);
}

export default ListOfArticles;
