import { useState, useContext } from "react";
import { updateCommentVotesById } from "../api";
import PageContext from "../context/PageContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useSelector } from "react-redux";
import Error from "./Error";

export default function CommentCard({ comment_id, author, body, votes }) {
  const [error, setError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [userVotes, setUserVotes] = useState(0);
  const { user } = useContext(PageContext);
  const lightTheme = useSelector((state) => state.themeKey);

  const handleLikeDislike = (type, comment_id) => {
    let voteCount = 0;

    if (type === "like") {
      voteCount = 1;
      setUserVotes((current) => current + 1);
      setIsLiked(true);
      setIsDisliked(false);
    } else {
      voteCount = -1;
      setUserVotes((current) => current - 1);
      setIsDisliked(true);
      setIsLiked(false);
    }

    updateCommentVotesById(comment_id, voteCount).catch((err) => {
      setError(true);
      setUserVotes((current) => {
        if (type === "like") {
          return current + 1;
        } else {
          return current - 1;
        }
      });
      setIsLoading(false);
    });
  };

  if (error) {
    return <Error />;
  }

  return (
    <section className={"commentCardWrapper" + (lightTheme ? "" : " dark")}>
      <p className={"commentBody" + (lightTheme ? "" : " dark")}>
        <span className="differentColor">{author}:</span> {body}
      </p>
      <p className={"commentVotes" + (lightTheme ? "" : " dark")}>
        <span className="differentColor">Votes:</span> {votes + userVotes}
      </p>
      {user ? (
        <>
          <button
            className={
              isLiked
                ? "clickedLikeButton" + (lightTheme ? "" : " dark")
                : "likeButton" + (lightTheme ? "" : " dark")
            }
            onClick={() => {
              handleLikeDislike("like", comment_id);
            }}
            disabled={isLiked}
          >
            <ThumbUpIcon />
          </button>
          <button
            className={
              isDisliked
                ? "clickedDislikeButton" + (lightTheme ? "" : " dark")
                : "dislikeButton" + (lightTheme ? "" : " dark")
            }
            onClick={() => {
              handleLikeDislike("dislike", comment_id);
            }}
            disabled={isDisliked}
          >
            <ThumbDownIcon />
          </button>
        </>
      ) : null}
    </section>
  );
}
