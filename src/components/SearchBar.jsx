import { useEffect, useState } from 'react';
import { getArticles, getTopics } from '../api';
import { useSearchParams } from 'react-router-dom';
import Loading from './Loading';
import PostArticle from './PostArticle';

function SearchBar({ setArticlesList }) {
	const [topicsList, setTopicsList] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [params, setParams] = useState(searchParams)

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

	useEffect(() => {
		setSearchParams(params)
	}, [params])

	const handleSubmit = (e) => {
		e.preventDefault();

		const params = {
			topic: e.target[0].value,
			sort: e.target[1].value,
			order: e.target[2].value
		}
	
		setParams({...params})

		getArticles(params.topic, params.sort, params.order)
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
				<p className="errorMessage">Something went wrong. Please try again.</p>
		);
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
		<form onSubmit={handleSubmit} className="searchBar">
			<section className="topicSection">
				<label htmlFor="">Topics:</label>
				<select id="topic" type="text">
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
				<select id="sort_by">
					<option value=""></option>
					<option value="title">title</option>
					<option value="author">author</option>
					<option value="created_at">date</option>
					<option value="votes">votes</option>
				</select>
			</section>

			<section className="orderSection">
				<label htmlFor="order">Order:</label>
				<select id="order">
					<option value=""></option>
					<option value="ASC">Ascending</option>
					<option value="DESC">Descending</option>
				</select>
			</section>

			<button className="btn">Filter</button>
		</form>
	</>
	);
}

export default SearchBar;
