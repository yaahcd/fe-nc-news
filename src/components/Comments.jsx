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
				<p>{error.request.status}: {error.response.data.msg}</p>
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
					<li className="commentItem" key={comment.comment_id}>
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
