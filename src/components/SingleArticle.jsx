import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  getArticlesById,
  updateVotesByArticleId,
  deleteArticleById,
} from "../api";
import Comments from "./Comments";
import { Button } from "@mui/material";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import Error from "./Error";
import PageContext from "../context/PageContext";

function SingleArticle() {
  const params = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userVotes, setUserVotes] = useState(0);
  const [clickedFavorite, setClickedFavorite] = useState(false);
  const { user } = useContext(PageContext);
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.themeKey);

  useEffect(() => {
    getArticlesById(params.article_id)
      .then((article) => {
        const date = new Date(article[0].created_at);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          date
        );
        article[0].created_at = formattedDate;
        setArticle(article[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  const handleClick = () => {
    setClickedFavorite(true);
    setUserVotes((currValue) => {
      return currValue + 1;
    });
    updateVotesByArticleId(params.article_id)
    .catch((err) => {
      setUserVotes((currValue) => {
        return currValue - 1;
      });
      setError(true);
    });
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    deleteArticleById(id)
      .then(() => {
        setIsLoading(false);
        window.alert("Your article has been deleted.");
        navigate("/");
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  };

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      { user === article.author ?
        <section className="deleteArticleButton">
        {
          <Button
            size="small"
            variant="contained"
            className="btn"
            sx={{
              color: "white",
              backgroundColor: "grey",
              height: "25px",
              borderRadius: "15px",
              ":hover": { backgroundColor: "#D90429" },
            }}
            onClick={(e) => {
              handleDelete(article.article_id);
            }}
          >
            delete my article
          </Button>
        }
      </section> : null}

      <section className={"articlePageContainer" + (lightTheme ? "" : " dark")}>
        <p className="dateHeader">{`${article.created_at}, posted by ${article.author}`}</p>
        <h2>{article.title}</h2>
        <img src={article.article_img_url} alt={`Image for ${article.title}`} />
        <p>{article.body}</p>
      </section>

      <section className={"articlePageVotes" + (lightTheme ? "" : " dark")}>
        <button onClick={handleClick} disabled={userVotes > 0}>
          {clickedFavorite ? (
            <FavoriteIcon
              className={"articlePageLikeButton" + (lightTheme ? "" : " dark")}
            />
          ) : (
            <FavoriteBorderIcon
              className={"articlePageLikeButton" + (lightTheme ? "" : " dark")}
            />
          )}
        </button>
        <p>{article.votes + userVotes}</p>
      </section>

      <Comments id={article.article_id} />
    </main>
  );
}

export default SingleArticle;
