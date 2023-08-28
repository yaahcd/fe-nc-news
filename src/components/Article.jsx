import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

function Article({ article }) {
  const navigate = useNavigate();

  const timeAgo = new TimeAgo("en-US");
  const createdAt = new Date(article.created_at);
  const date = timeAgo.format(createdAt);

  return (
    <li
      className="articleItem"
      onClick={() => {
        navigate(`/articles/${article.article_id}`);
      }}
    >
      <img
        className="articleImg"
        src={article.article_img_url}
        alt={`Image for ${article.name}`}
      />

      <h3>{article.title}</h3>

      <h4>
        Written by {article.author}, {date}
      </h4>
      <div className="iconsContainer">
        <div className="comments">
          <ModeCommentIcon className="commentIcon" />
          <p> {article.comment_count} </p>
        </div>
        <div className="favorite">
          <FavoriteIcon className="favoriteIcon" />
          <p>{article.votes}</p>
        </div>
      </div>
    </li>
  );
}

export default Article;
