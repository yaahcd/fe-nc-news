import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { getCommentsByArticleId, postCommentsByArticleId, deleteComment } from '../api';
import Loading from './Loading';
import BlogContext from '../contexts/BlogContext'

function Comments({ id }) {
	const [comments, setComments] = useState([]);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [newComment, setNewComment] = useState({
    "username": '',
    "body": ''
  })
  const [postConfirmation, setPostConfirmation] = useState(false)
	const {user} = useContext(BlogContext)

	useEffect(() => {
		setError(false)
		getCommentsByArticleId(id)
			.then(({ commentList }) => {
				setComments(commentList);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	}, [comments]);

	const handleSubmit = (e) => {
    e.preventDefault();

    postCommentsByArticleId(id, newComment).then((addedComment) => {
      setComments([addedComment[0], ...comments])
      setPostConfirmation(true)
    }).catch((err) => {
      setError(err)
    })
  }

	const handleClick = (e) => {
		
		const id = e.target.dataset.set
		setIsLoading(true)
		deleteComment(id).then(() => {
		
			setIsLoading(false)
		})
	}

	if (error) {
		if (error.message === 'Network Error') {
			toast.error('No connection');
		} else {
			return (
				<section className="errorMessage">
					<p>
						{error.request.status}: {error.response.data.msg}
					</p>
				</section>
			);
		}
	}

	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
		<ul className="commentList" >
			{comments.map((comment) => {
				return (
					<li className="commentItem" key={Math.random()}>
						<p>
							{comment.author}: {comment.body}
						</p>
						<p>Votes: {comment.votes}</p>
						{ user === comment.author ? <button data-set={comment.comment_id} onClick={handleClick}>delete</button> : null }
					</li>
				);
			})}
		</ul>
		<section className='postComment'>
		<form onSubmit={handleSubmit}>
			<label htmlFor="username"></label>
			<input type="text" id='username' placeholder='Please add your username here' value={postConfirmation? '' : newComment.username} onChange={(e) => setNewComment((newComment) => {
					return {...newComment, username: e.target.value }
				})
			} required/>
			<label htmlFor="commentBox"></label>
			<input type="text" id="commentBox" placeholder='Add your comment here...' value={postConfirmation? '' : newComment.body} onChange={(e) => setNewComment((newComment) => {
					return {...newComment, body: e.target.value }
				})
				} required/>
			<button className='btn' disabled={postConfirmation}>add comment</button>
		</form>
		{postConfirmation ? <p>Your comment has been posted.</p> : null}
	</section>
	</>
	);
}

export default Comments;
