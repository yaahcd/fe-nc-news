import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { useSearchParams } from "react-router-dom";
import Error from "./Error";
import SingleArticle from "./ArticleItem";
import SearchBar from "./SearchBar";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Loading from "./Loading";
import { useSelector } from "react-redux";

function ListOfArticles() {
  const [articlesList, setArticlesList] = useState([]);
  const [noQueryArticleList, setNoQueryArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [pageChange, setPageChange] = useState(false)
  const [resetFilter, setResetFilter] = useState(false)
  const lightTheme = useSelector((state) => state.themeKey);
  let page = searchParams.get("p");

  
  useEffect(() => {
    page
      ? page
      : (page = setSearchParams((current) => {
          current.set("p", 1);
          return current;
        }));
        
    getArticles(undefined, undefined, undefined, 6, +page)
      .then(({ articles }) => {
        setArticlesList(articles);
        setNoQueryArticleList(articles);
        setIsLoading(false);
        setPageChange(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, [pageChange]);

  const handleClick = (e) => {
    setSearchParams((current) => {
      current.set("p", +e.target.innerText);
      return current;
    });
    setPageChange(true);
  };

  const handleArrowClick = (side) => {
    if (side === "left") {
      setSearchParams((current) => {
        current.set("p", +page - 1);
        return current;
      });
      setPageChange(true);
    } else {
      setSearchParams((current) => {
        current.set("p", +page + 1);
        return current;
      });
      setPageChange(true);
    }
  };

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <SearchBar setArticlesList={setArticlesList} />
      <ul className="articlesList">
        {articlesList.length === 0 ? (
          <p>No articles on this topic.</p>
        ) : (
          articlesList.map((article, index) => {
            return (
              <SingleArticle
                key={index}
                article={article}
                date={article.created_at}
              />
            );
          })
        )}
      </ul>
      <div className={"paginationArray" + (lightTheme ? "" : " dark")}>
        {noQueryArticleList.length === articlesList.length && (
          <>
            <button
              onClick={() => {
                handleArrowClick("left");
              }}
              disabled={+page === 1}
            >
              <KeyboardArrowLeftIcon />
            </button>
            {Array(7)
              .fill("")
              .map((_, index) => {
                return (
                  <button
                    onClick={handleClick}
                    className={+page === index + 1 ? "boldNumber" : null}
                    key={index}
                  >
                    {index + 1}
                  </button>
                );
              })}
            <button
              onClick={() => {
                handleArrowClick("right");
              }}
              disabled={+page === 7}
            >
              <KeyboardArrowRightIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ListOfArticles;
