import { useNavigate } from "react-router";

function Article({ article }) {

	const navigate = useNavigate();

	return (
		<div className="articleItem">
			<img onClick={() => navigate(`/articles/${article.article_id}`)}
				className="articleImg"
				src={article.article_img_url}
				alt={`Image for ${article.name}`}
			/>
			<h3>{article.title}</h3>
			<h4>{article.author}</h4>
			<p className="articleCommentCount">Comments: {article.comment_count}</p>
			<p className="votes">Votes: {article.votes}</p>
		</div>
	);
}

export default Article;
