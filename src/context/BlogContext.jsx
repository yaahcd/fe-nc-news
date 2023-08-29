import { createContext, useState } from "react";

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [user, setUser] = useState("grumpy19");

  return (
    <PageContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export default PageContext;
