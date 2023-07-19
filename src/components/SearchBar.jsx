import { useEffect, useState } from 'react';
import { getArticles, getTopics } from '../api';
import { useSearchParams } from 'react-router-dom';
import Loading from './Loading';

function SearchBar({ setArticlesList }) {
	const [topicsList, setTopicsList] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const orderQuery = searchParams.get('order');
	const sortQuery = searchParams.get('sort_by');
	const topicQuery = searchParams.get('topic');

  
	useEffect(() => {
		setError(false);
		getTopics()
			.then((topics) => {
				setTopicsList([{ slug: '' }, ...topics]);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	}, []);

	const setSortOrder = (e) => {
		const direction = e.target.value;

		const newParams = new URLSearchParams(searchParams);
		newParams.set('order', direction);
		setSearchParams(newParams);
	};

	const setSortBy = (e) => {
		const type = e.target.value;

		const newParams2 = new URLSearchParams(searchParams);
		newParams2.set('sort_by', type);
		setSearchParams(newParams2);
	};

	const setTopicQuery = (e) => {
		const topic = e.target.value;

		const newParams3 = new URLSearchParams(searchParams);
		newParams3.set('topic', topic);
		setSearchParams(newParams3);
	};

	const handleClick = (e) => {
		e.preventDefault();

		getArticles(topicQuery, sortQuery, orderQuery)
			.then(({ articles }) => {
				setArticlesList(articles);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(true);
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

			<section className="topicSection">
				<label htmlFor="topic">Topics:</label>
				<select onChange={setTopicQuery} id="topic" type="text">
					{topicsList.map((topic) => {
						return (
							<option key={topic.slug} value={topic.slug}>
								{topic.slug}
							</option>
						);
					})}
				</select>
			</section>

			<section className="sortBySection">
				<label htmlFor="sort_by">Sort:</label>
				<select onChange={setSortBy} id="sort_by">
					<option value="blank"></option>
					<option value="title">title</option>
					<option value="author">author</option>
					<option value="created_at">date</option>
					<option value="votes">votes</option>
				</select>
			</section>

			<section className="orderSection">
				<label htmlFor="order">Order:</label>
				<select onChange={setSortOrder} id="order">
					<option value="blank"></option>
					<option value="ASC">Ascending</option>
					<option value="DESC">Descending</option>
				</select>
			</section>

			<button onClick={handleClick} className="btn">
				Filter
			</button>
      
		</section>
	);
}

export default SearchBar;
