import { useEffect, useState } from 'react';
import { getArticles, getTopics } from '../api';
import Loading from './Loading';

function SearchBar({ setArticlesList }) {
	const [topicsList, setTopicsList] = useState();
	const [topicQuery, setTopicQuery] = useState();
	const [sortQuery, setSortQuery] = useState();
	const [orderQuery, setOrderQuery] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
    setError(false)
		getTopics()
			.then((topics) => {
				setTopicsList([{ slug: '' }, ...topics]);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	}, [topicsList]);

	const handleChangeTopic = (e) => {
		setTopicQuery(e.target.value);
	};

	const handleChangeSort = (e) => {
		setSortQuery(e.target.value);
	};

	const handleChangeOrder = (e) => {
		setOrderQuery(e.target.value);
	};

	const handleClick = (e) => {
		e.preventDefault();

		getArticles(topicQuery, sortQuery, orderQuery).then(({ articles }) => {
			setArticlesList(articles);
			setIsLoading(false);
		});
	};

	if (error) {
		return (
			<section className="errorMessage">
				<p>
					{error.request.status}: {error.response.data.msg}
				</p>
			</section>
		);
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<section className="searchBar">
			<label htmlFor="topic">Topics</label>
			<select onChange={handleChangeTopic} id="topic" type="text">
				{topicsList.map((topic) => {
					return (
						<option key={topic.slug} value={topic.slug}>
							{topic.slug}
						</option>
					);
				})}
			</select>
			<label htmlFor="sortby">Sort</label>
			<select onChange={handleChangeSort} id="sortby">
				<option value="blank"></option>
				<option value="title">title</option>
				<option value="author">author</option>
				<option value="created_at">date</option>
				<option value="votes">votes</option>
			</select>
			<label htmlFor="order">Order</label>
			<select onChange={handleChangeOrder} id="order">
				<option value="blank"></option>
				<option value="ASC">Ascending</option>
				<option value="DESC">Descending</option>
			</select>
			<button onClick={handleClick} className="btn">
				Send
			</button>
		</section>
	);
}

export default SearchBar;
