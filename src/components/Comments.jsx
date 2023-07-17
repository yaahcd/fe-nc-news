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

  return (
    <div className='commentList'>
     {
      comments.map((comment) => {
        return <div className='commentItem'>
              <p>{comment.author}: {comment.body}</p>
              <p>Votes: {comment.votes}</p>
              </div>
      })
     }
    </div>
  )
}

export default Comments
