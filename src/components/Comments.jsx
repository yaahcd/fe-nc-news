import { useState, useEffect, useContext } from 'react';
import {
	getCommentsByArticleId,
	postCommentsByArticleId,
	deleteComment,
} from '../api';
import Loading from './Loading';
import BlogContext from '../contexts/BlogContext';

function Comments({ id }) {
	const [comments, setComments] = useState([]);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [newComment, setNewComment] = useState({
		username: '',
		body: '',
	});
	const [postConfirmation, setPostConfirmation] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const { user } = useContext(BlogContext);

	useEffect(() => {
		setError(false);
		getCommentsByArticleId(id)
			.then(({ commentList }) => {
				setComments(commentList);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(true);
				setIsLoading(false);
			});
	}, [deleteConfirmation]);

	const handleSubmit = (e) => {
		e.preventDefault();

		setIsLoading(true);
		newComment.username = user;
		postCommentsByArticleId(id, newComment)
			.then((addedComment) => {
				setIsLoading(false);
				setComments([addedComment[0], ...comments]);
				setPostConfirmation(true);
			})
			.catch((err) => {
				setError(true);
				setIsLoading(false);
			});
	};

	const handleClick = (comment, e) => {
		e.preventDefault();

		setComments((currValue) => {
			return currValue.filter((comments) => comments.id !== comment.comment_id);
		});

		setIsLoading(true);
		deleteComment(comment.comment_id)
			.then(() => {
				setDeleteConfirmation(true);
				setIsLoading(false);
				window.alert('Your comment has been deleted.');
			})
			.catch((err) => {
				setIsLoading(false);
				setError(true);
				setComments((currValue) => {
					return [comment, ...currValue];
				});
			});
	};

	if (error) {
		return (
			<p className="errorMessage">Something went wrong. Please try again.</p>
		);
	}

	if (isLoading) {
		return <Loading />;
	}
	return (
		<main className="commentSection">
			<ul className="commentList">
				{comments.map((comment) => {
					return (
						<li className="commentItem" key={comment.comment_id}>
							<p>
								<span className="differentColor">{comment.author}:</span>{' '}
								{comment.body}
							</p>
							<p>
								<span className="differentColor">Votes:</span> {comment.votes}
							</p>
							{user === comment.author ? (
								<button
									className="btn"
									onClick={(e) => {
										handleClick(comment, e);
									}}
								>
									delete
								</button>
							) : null}
						</li>
					);
				})}
			</ul>
			<section className="postComment">
				<form onSubmit={handleSubmit}>
					{user ? (
						<h4>You are logged in as: {user}</h4>
					) : (
						<p className="signInError">
							Only users can comment. Please sign-in.
						</p>
					)}
					{user ? (
						<>
							<label htmlFor="commentBox"></label>
							<textarea
								type="text"
								id="commentBox"
								placeholder="Add your comment here..."
								value={postConfirmation ? '' : newComment.body}
								onChange={(e) =>
									setNewComment((newComment) => {
										return { ...newComment, body: e.target.value };
									})
								}
								required
							/>
							<button className="btn">
								add comment
							</button>{' '}
						</>
					) : null}
				</form>
				{postConfirmation ? (
					<p className="postingConfirmation">Your comment has been posted.</p>
				) : null}
			</section>
		</main>
	);
}

export default Comments;
