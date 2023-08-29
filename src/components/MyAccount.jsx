import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import PageContext from "../context/PageContext";
import { getUserByUsername } from "../api";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Error from "./Error";

function MyAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(PageContext);
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.themeKey);

  useEffect(() => {
    getUserByUsername(user)
      .then((user) => {
        setUserInfo(user[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  const handleClick = () => {
    setUser(null);
    window.localStorage.clear();
    navigate("/");
  };

  if (error) {
    return <Error />
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className={"userContainer" + (lightTheme ? "" : " dark")}>
      <h2>Hello {userInfo.name}! 😄</h2>
      <img src={userInfo.avatar_url} alt="" />
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
        onClick={() => {
          navigate("/");
        }}
      >
        Go to articles
      </Button>
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
        onClick={handleClick}
      >
        Logout
      </Button>
    </main>
  );
}

export default MyAccount;
