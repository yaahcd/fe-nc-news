import { useState, useContext, useEffect } from 'react';
import { getTopics, postArticle, postTopic } from '../api';
import Loading from './Loading';
import BlogContext from '../contexts/BlogContext';
import { Link, useNavigate } from 'react-router-dom';

function PostArticle() {
	const [topicsList, setTopicsList] = useState();
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useContext(BlogContext);
  const navigate = useNavigate()
	const [newPost, setNewPost] = useState({
		title: '',
		topic: '',
		body: '',
		article_img_url: '',
		author: user,
	});

	useEffect(() => {
		setError(false);
		getTopics()
			.then((topics) => {
				setTopicsList([...topics]);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
 
    setIsLoading(true)
    const topicListFilter = topicsList.filter((topic) => topic.slug === newPost.topic)

    if(topicListFilter.length === 0){
      postTopic(newPost.topic).then((newTopic) => {
        setTopicsList([...newTopic, topicsList])
      }).catch((err) => {
        setError(true)
      })
    }

    postArticle(newPost).then(({article_posted}) => {
      setIsLoading(false)
      navigate(`/articles/${article_posted[0].article_id}`)
    }).catch((err) => {
      setError(true)
      setIsLoading(false)
    })
	};

  
	if (error) {
		return (
			<p className="errorMessage">Something went wrong. Please try again.</p>
		);
	}

	if (isLoading) {
		return <Loading />;
	}
	return user ? <main className="postArticleContainer">
			<h2>Post new article</h2>
			<form onSubmit={handleSubmit} className="postForm">
        <label htmlFor="title">Article title:</label>
				<input
					type="text"
					id="title"
					value={newPost.title}
					onChange={(e) =>
						setNewPost((newPost) => {
							return { ...newPost, title: e.target.value };
						})
					}
					required
				/>
				<section className="topicSectionForm">
					<label htmlFor="topic">Topic:</label>
					<input
						id="topic"
						type="text"
						value={newPost.topic}
						onChange={(e) =>
							setNewPost((newPost) => {
								return { ...newPost, topic: e.target.value.toLowerCase() };
							})
						}
						required
					/>
				</section>
				<textarea
					type="text"
					id="body"
          placeholder='What is on you mind?'
					onChange={(e) =>
						setNewPost((newPost) => {
							return { ...newPost, body: e.target.value };
						})
					}
				></textarea>
        <label htmlFor="topic">URL image for your article:</label>
				<input
					type="text"
					id="url"
					value={newPost.article_img_url}
					onChange={(e) =>
						setNewPost((newPost) => {
							return { ...newPost, article_img_url: e.target.value };
						})
					}
				/>
				<button className="btn">Post</button>
			</form>
		</main> 
    : <p className='PostArticleError'>Please <Link to='/sign_in'>sign-in</Link> to post an article.</p>
}

export default PostArticle;
