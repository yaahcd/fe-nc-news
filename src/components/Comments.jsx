import { useState, useEffect } from 'react';
import { getCommentsByArticleId } from '../api';

function Comments({id}) {

  const [comments, setComments] = useState([])
	const [error, setError] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(id).then(({commentList}) => {
      setComments(commentList)
    })
    .catch((err) => {
      setArticle([]);
     setError(err)
    });
  }, [])

  if (error) {
		return (
			<section className="errorMessage">
				<p>{JSON.stringify(error.message)}</p>
			</section>
		);
	}

  return (
    <section className='commentList'>
     {
      comments.map((comment) => {
        return <div className='commentItem'>
              <p>{comment.author}: {comment.body}</p>
              <p>Votes: {comment.votes}</p>
              </div>
      })
     }
    </section>
  )
}

export default Comments
