import { useState, useContext, useEffect } from "react";
import { getTopics, postArticle, postTopic } from "../api";
import Loading from "./Loading";
import PageContext from "../context/PageContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Error from "./Error";

function PostArticle() {
  const [topicsList, setTopicsList] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [topicButtonClicked, setTopicButtonClicked] = useState(false);
  const { user } = useContext(PageContext);
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    title: "",
    topic: "",
    body: "",
    article_img_url: "",
    author: user,
  });
  const lightTheme = useSelector((state) => state.themeKey);

  useEffect(() => {
    setError(false);
    getTopics()
      .then((topics) => {
        setTopicsList([...topics]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    const topicListFilter = topicsList.filter(
      (topic) => topic.slug === newPost.topic
    );

    if (topicListFilter.length === 0) {
      postTopic(newPost.topic)
        .then((newTopic) => {
          setTopicsList([...newTopic, topicsList]);
        })
        .catch((err) => {
          setError(true);
        });
    }

    postArticle(newPost)
      .then(({ article_posted }) => {
        setIsLoading(false);
        navigate(`/articles/${article_posted[0].article_id}`);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  };

  if (error) {
    return <Error />
  }

  if (isLoading) {
    return <Loading />;
  }
  return user ? (
    <main className={"postArticleContainer" + (lightTheme ? "" : " dark")}>
      <h2>Post new article</h2>

      <form onSubmit={handleSubmit} className="postForm">
        <section className={"postTitle" + (lightTheme ? "" : " dark")}>
          <label htmlFor="title">Article title:</label>
          <input
            type="text"
            id="title"
            value={newPost.title}
            onChange={(e) =>
              setNewPost((newPost) => {
                return { ...newPost, title: e.target.value };
              })
            }
            required
          />
        </section>

        <section className={"postSelection" + (lightTheme ? "" : " dark")}>
          <label htmlFor="">Topics:</label>
          <select
            id="topic"
            type="text"
            onChange={(e) =>
              setNewPost((newPost) => {
                return { ...newPost, topic: e.target.value };
              })
            }
          >
            {topicsList
              ? topicsList.map((topic) => {
                  return (
                    <option key={topic.slug} value={topic.slug}>
                      {topic.slug}
                    </option>
                  );
                })
              : null}
          </select>
        </section>

        <section className="addTopicButton">
          <Button
            size="small"
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "grey",
              height: "25px",
              borderRadius: "15px",
              ":hover": { backgroundColor: "#D90429" },
            }}
            onClick={() => {
              setTopicButtonClicked(!topicButtonClicked);
              newPost.topic = "";
            }}
          >
            Want to add a new topic?
          </Button>
        </section>

        {topicButtonClicked && (
          <section className={"postAddTopic" + (lightTheme ? "" : " dark")}>
            <label htmlFor="topic">New topic:</label>
            <input
              id="topic"
              type="text"
              value={newPost.topic}
              onChange={(e) =>
                setNewPost((newPost) => {
                  return {
                    ...newPost,
                    topic: e.target.value.toLowerCase().trim(),
                  };
                })
              }
              required
            />
          </section>
        )}

        <textarea
          required
          type="text"
          id="body"
          placeholder="What is on you mind?"
          onChange={(e) =>
            setNewPost((newPost) => {
              return { ...newPost, body: e.target.value };
            })
          }
        ></textarea>

        <section className={"postArticleImg" + (lightTheme ? "" : " dark")}>
          <label htmlFor="topic">URL image:</label>
          <input
            type="text"
            id="url"
            value={newPost.article_img_url}
            onChange={(e) =>
              setNewPost((newPost) => {
                return { ...newPost, article_img_url: e.target.value };
              })
            }
          />
        </section>

        <section className="postArticleButton">
          <Button
            type="submit"
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
            Post article
          </Button>
        </section>
      </form>
    </main>
  ) : <Error message={"Please sign-in to post an article."}/>
    
}

export default PostArticle;
