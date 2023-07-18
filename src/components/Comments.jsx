import { useState, useEffect } from 'react';
import { getCommentsByArticleId } from '../api';
import Loading from './Loading';

function Comments({ id }) {
	const [comments, setComments] = useState([]);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getCommentsByArticleId(id)
			.then(({ commentList }) => {
				setComments(commentList);
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
				<p>{JSON.stringify(error.message)}</p>
			</section>
		);
	}

	if (isLoading) {
		return <Loading />;
	}
	return (
		<ul className="commentList">
			{comments.map((comment) => {
				return (
					<li key={comment.comment_id} className="commentItem">
						<p>
							{comment.author}: {comment.body}
						</p>
						<p>Votes: {comment.votes}</p>
					</li>
				);
			})}
		</ul>
	);
}

export default Comments;
