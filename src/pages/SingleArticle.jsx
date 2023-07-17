import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getArticlesById } from '../api';
import Loading from '../components/Loading';

function SingleArticle() {
	const params = useParams();

	const [article, setArticle] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getArticlesById(params.article_id)
			.then((article) => {
				setArticle(...article);
				setIsLoading(false);
			})
			.catch((err) => {
				setArticle([]);
				setError(true);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className="articlePageContainer">
			<h2>{article.title}</h2>
			<h3>Written by {article.author}</h3>
			<img src={article.article_img_url} alt="" />
			<p>{article.body}</p>
		</div>
	);
}

export default SingleArticle;
