import { createContext, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {

  return (
    <BlogContext.Provider 
    value={{

    }}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContext