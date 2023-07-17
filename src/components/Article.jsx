import { Link } from "react-router-dom";

function Article({ article }) {

	return (
		<main className="articleItem">
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
			<h4>{article.author}</h4>
			<p className="articleCommentCount">Comments: {article.comment_count}</p>
			<p className="votes">Votes: {article.votes}</p>
		</main>
	);
}

export default Article;
