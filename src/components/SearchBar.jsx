import { useEffect, useState } from "react";
import { getArticles, getTopics } from "../api";
import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";

function SearchBar({ setArticlesList }) {
  const [topicsList, setTopicsList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetFilter, setResetFilter] = useState(false)
  const [selectTopic, setSelectTopic] = useState('')
  const [selectSort, setSelectSort] = useState('')
  const [selectOrder, setSelectOrder] = useState('')
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");
  const topic = searchParams.get("topic");
  const lightTheme = useSelector((state) => state.themeKey);

  useEffect(() => {
    setError(false);
    getTopics()
      .then((topics) => {
        setTopicsList([{ slug: "" }, ...topics]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sortBy, order)
      .then(({ articles }) => {
        setArticlesList(articles);
        setIsLoading(false);
        setResetFilter(false)
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, [searchParams]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(resetFilter){
      e.target[0].value = ''
      e.target[1].value = ''
      e.target[2].value = ''
    }

    if (e.target[0].value) {
      setSearchParams((current) => {
        current.set("topic", e.target[0].value);
        return current;
      });
    }
    
    if (e.target[1].value) {
      setSearchParams((current) => {
        current.set("sort_by", e.target[1].value);
        return current;
      });
    }
    
    if (e.target[2].value) {
      setSearchParams((current) => {
        current.set("order", e.target[2].value);
        return current;
      });
    }
    
  };

  const handleClick = () => {
    setResetFilter(true)
    setSearchParams({'p': 1})
    setSelectTopic('')
    setSelectOrder('')
    setSelectSort('')
  }

  if (error) {
    return <Error />
  }

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="mainSectionSearchBar">
      <form
        onSubmit={handleSubmit}
        className={"searchBar" + (lightTheme ? "" : " dark")}
      >
        <section className={"topicSection" + (lightTheme ? "" : " dark")}>
          <label htmlFor="">Topics:</label>
          <select id="topic" type="text" value={selectTopic} onChange={(e) => setSelectTopic(e.target.value)}>
            {topicsList
              ? topicsList.map((topic, index) => {
                  return (
                    <option key={index} value={topic.slug}>
                      {topic.slug}
                    </option>
                  );
                })
              : null}
          </select>
        </section>

        <section className={"sortBySection" + (lightTheme ? "" : " dark")}>
          <label htmlFor="sort_by">Sort:</label>
          <select id="sort_by" value={selectSort} onChange={(e) => setSelectSort(e.target.value)}>
            <option value=""></option>
            <option value="title">title</option>
            <option value="author">author</option>
            <option value="created_at">date</option>
            <option value="votes">votes</option>
          </select>
        </section>

        <section className={"orderSection" + (lightTheme ? "" : " dark")}>
          <label htmlFor="order">Order:</label>
          <select id="order" value={selectOrder} onChange={(e) => setSelectOrder(e.target.value)}>
            <option value=""></option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </section>

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
          Filter
        </Button>
      </form>
      <Button
         onClick={handleClick}
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
          reset filter
        </Button>
    </div>
  );
}

export default SearchBar;
