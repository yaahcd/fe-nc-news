import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getArticlesById } from '../api';
import Loading from './Loading';
import Comments from './Comments';

function SingleArticle() {
	const params = useParams();

	const [article, setArticle] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getArticlesById(params.article_id)
			.then((article) => {
				setArticle(article[0]);
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
				<p>Something went wrong: could not load article.</p>
			</section>
		);
	}

	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
		<ul className="articlePageContainer">
			<h2>{article.title}</h2>
			<h3>Written by {article.author}</h3>
			<img src={article.article_img_url} alt="" />
			<p>{article.body}</p>
		</ul>

		<section className='commentsContainer'>
		<p className='commentsCount'>Comments: {article.comment_count}</p>
		<p className='votesCount'>Votes: {article.votes}</p>
		<Comments id={article.article_id} />
		</section>
		</>
	);
}

export default SingleArticle;
