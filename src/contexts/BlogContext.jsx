import { createContext, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({children}) => {
  const [user, setUser] = useState(null)

  return (
   <BlogContext.Provider value={{
    user,
    setUser
   }}>
    {children}
   </BlogContext.Provider>
  )
}

export default BlogContext