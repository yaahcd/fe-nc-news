import { useEffect, useState } from "react"
import { getArticles, getTopics } from "../api"
import Loading from "./Loading"

function SearchBar({setArticlesList}) {
 
  const [topicsList, setTopicsList] = useState()
  const [topicQuery, setTopicQuery] = useState()
  const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)

  useEffect(() => {
    getTopics().then((topics) => {
      setTopicsList([{slug: '' }, ...topics])
      setIsLoading(false)
    }).catch((err) => {
      setError(true);
      setIsLoading(false);
    });
  }, [])

  const handleChange = (e) => {
    setTopicQuery(e.target.value)
  } 

  const handleClick = (e) => {
    e.preventDefault()

    getArticles(topicQuery).then(({articles}) => {
      setArticlesList(articles)
      setIsLoading(false)
    }).catch((err) => {
      setError(true)
      setIsLoading(false)
    })
  }

  if (error) {
		return (
			<section className="errorMessage">
				<p>{error.request.status}: {error.response.data.msg}</p>
			</section>
		);
	}

  if(isLoading){
    return <Loading />
  } else {
    return (
      <section className="searchBar">
         <label htmlFor="category">Topics</label>
        <select onChange={handleChange} id='category'type="text">
         { topicsList.map((topic) => {
          return  <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
         })}
        </select>
         <button onClick={handleClick} className="btn">Send</button>
      </section>
    )
  }
}

export default SearchBar
