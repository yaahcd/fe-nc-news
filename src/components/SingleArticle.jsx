import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import {toast} from 'react-toastify'
import { getArticlesById, updateVotesByArticleId } from '../api';
import Loading from './Loading';
import Comments from './Comments';

function SingleArticle() {
	const params = useParams();

	const [article, setArticle] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [userVotes, setUserVotes] = useState(0)

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

	const handleClick = () => {
		setUserVotes((currValue) => {
			return currValue + 1
		})

		updateVotesByArticleId(params.article_id).catch((err) => {
			setUserVotes((currValue) => {
				return currValue - 1
			})
			setError(err)
		})
	}
  
  if (error) {
		if(error.message === "Network Error"){
			toast.error('No connection')
		} else {
		return (
			<section className="errorMessage">
				<p>{error.request.status}: {error.response.data.msg}</p>
			</section>
		);
	}
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
				<p className='votesCount'>Votes: {article.votes + userVotes}</p>
				<button className='btn' onClick={handleClick} disabled={userVotes > 0}>😍</button>
				</section>
				<Comments id={article.article_id} />
				</>
	);
}

export default SingleArticle;
