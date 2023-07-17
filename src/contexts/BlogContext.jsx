import { createContext, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {

  const [articlesList, setArticlesList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <BlogContext.Provider 
    value={{
      articlesList,
      isLoading,
      error,
      setArticlesList,
      setIsLoading,
      setError
    }}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContext