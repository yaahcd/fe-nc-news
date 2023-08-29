import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { postUser } from "../api";
import PageContext from "../context/PageContext";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Error from "./Error";

function SignUp() {
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    avatar_url: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(PageContext);
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.themeKey);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postUser(newUser)
      .then(({ postedUser }) => {
        setIsLoading(false);
        setUser(postedUser[0].username);
        navigate("/my_account");
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

  return (
    <main className={"signUpContainer" + (lightTheme ? "" : " dark")}>
      <form onSubmit={handleSubmit} className="signUpForm">
        <h2>Hey there!</h2>
        <input
          id="username"
          type="text"
          value={newUser.username}
          placeholder="Enter your username"
          onChange={(e) =>
            setNewUser((newUser) => {
              return { ...newUser, username: e.target.value };
            })
          }
          required
        />
        <input
          id="name"
          type="text"
          value={newUser.name}
          placeholder="Enter your name"
          onChange={(e) =>
            setNewUser((newUser) => {
              return { ...newUser, name: e.target.value };
            })
          }
          required
        />
        <input
          id="avatar_url"
          type="text"
          value={newUser.avatar_url}
          placeholder="Enter the URL for your profile image"
          onChange={(e) =>
            setNewUser((newUser) => {
              return { ...newUser, avatar_url: e.target.value };
            })
          }
          required
        />
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
        >
          Sign up
        </Button>
      </form>
    </main>
  );
}

export default SignUp;
