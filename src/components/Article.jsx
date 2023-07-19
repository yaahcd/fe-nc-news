import { Link } from "react-router-dom";

function Article({ article }) {

	return (
		<li className="articleItem">
			<Link to={`/articles/${article.article_id}`}>
			<img
				className="articleImg"
				src={article.article_img_url}
				alt={`Image for ${article.name}`}
			/>
			</Link>
			<Link to={`/articles/${article.article_id}`}>
			<h3>{article.title}</h3>
			</Link>
			<h4>Written by {article.author}</h4>
			<p>Comments: {article.comment_count}</p>
			<p>Votes: {article.votes}</p>
		</li>
	);
}

export default Article;
