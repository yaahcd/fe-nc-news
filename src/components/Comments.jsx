import { useState, useEffect, useContext } from "react";
import {
  getCommentsByArticleId,
  postCommentsByArticleId,
  deleteComment,
} from "../api";
import PageContext from "../context/PageContext";
import { Button } from "@mui/material";
import CommentCard from "./CommentCard";
import ExpandableCommentContainer from "./ExpandableCommentContainer";
import { useSelector } from "react-redux";
import Error from "./Error";

function Comments({ id }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState({
    username: "",
    body: "",
  });
  const [postConfirmation, setPostConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const { user } = useContext(PageContext);
  const lightTheme = useSelector((state) => state.themeKey);

  useEffect(() => {
    setError(false);
    getCommentsByArticleId(id)
      .then(({ commentList }) => {
        setComments(commentList);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, [deleteConfirmation]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    newComment.username = user;
    postCommentsByArticleId(id, newComment)
      .then((addedComment) => {
        setIsLoading(false);
        setComments([addedComment[0], ...comments]);
        setPostConfirmation(true);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  };

  const handleClick = (comment, e) => {
    e.preventDefault();

    setComments((currValue) => {
      return currValue.filter((comments) => comments.id !== comment.comment_id);
    });

    setIsLoading(true);
    deleteComment(comment.comment_id)
      .then(() => {
        setDeleteConfirmation(true);
        setIsLoading(false);
        window.alert("Your comment has been deleted.");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
        setComments((currValue) => {
          return [comment, ...currValue];
        });
      });
  };

  if (error) {
    return <Error />
  }

  if (isLoading) {
  }
  return (
    <ExpandableCommentContainer>
      <main className={"commentSection" + (lightTheme ? "" : " dark")}>
        <section className={"postComment" + (lightTheme ? "" : " dark")}>
          <form>
            {user ? (
              <h4>You are logged in as: {user}</h4>
            ) : (
              <Error message={'Only users can comment. Please sign-in.'}/>
            )}
            {user ? (
              <>
                <textarea
                  type="text"
                  id="commentBox"
                  placeholder="Add your comment here..."
                  value={postConfirmation ? "" : newComment.body}
                  onChange={(e) =>
                    setNewComment((newComment) => {
                      return { ...newComment, body: e.target.value };
                    })
                  }
                  required
                />
                <Button
                  onClick={handleSubmit}
                  size="small"
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "grey",
                    height: "25px",
                    borderRadius: "15px",
                    ":hover": { backgroundColor: "#D90429" },
                  }}
                >
                  add comment
                </Button>
              </>
            ) : null}
          </form>
          {postConfirmation ? window.alert('Your comment has been posted') : null}
        </section>

        <ul className={"commentList" + (lightTheme ? "" : " dark")}>
          {comments.map((comment) => {
            return (
              <li
                className={"commentItem" + (lightTheme ? "" : " dark")}
                key={comment.comment_id}
              >
                <CommentCard
                  comment_id={comment.comment_id}
                  author={comment.author}
                  body={comment.body}
                  votes={comment.votes}
                />
                {user === comment.author ? (
                  <div className="deleteCommentButton">
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      className="btn"
                      sx={{
                        color: "white",
                        backgroundColor: "grey",
                        height: "20px",
                        borderRadius: "15px",
                        ":hover": { backgroundColor: "#D90429" },
                      }}
                      onClick={(e) => {
                        handleClick(comment, e);
                      }}
                    >
                      delete
                    </Button>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </main>
    </ExpandableCommentContainer>
  );
}

export default Comments;
