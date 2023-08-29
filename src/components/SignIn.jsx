import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import PageContext from "../context/PageContext";
import { getUserByUsername } from "../api";
import { useSelector } from "react-redux";
import { Button, Tooltip } from "@mui/material";
import Error from "./Error";
import HelpIcon from '@mui/icons-material/Help';

function SignIn() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const { user, setUser } = useContext(PageContext);
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.themeKey);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    getUserByUsername(username)
      .then((user) => {
        setIsLoading(true);
        setUser(user[0].username);
        window.localStorage.setItem("user", user[0].username);
        navigate("/my_account");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.msg)
        if(err.response.data.msg !== 'Invalid username'){
        setError(true);
      }
      setIsLoading(false);
      });
  };

  if(error) {
      return <Error />
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className={"signInContainer" + (lightTheme ? "" : " dark")}>
      <h2>Welcome back!</h2>
      <form onSubmit={handleSubmit} className="SignInForm">
        <label htmlFor="Username"></label>
        <input
          type="text"
          placeholder="Please enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className="helpIcon">
        <Tooltip title="Please use 'grumpy19' if you do not wish to sign up">
          <HelpIcon fontSize="medium"/>
        </Tooltip>
        </div>
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
          Sign in
        </Button>
      </form>
      <p>
        New here? <Link to="/sign_up">Sign-up</Link> instead.
      </p>
      {errorMessage === "Invalid username" ? <p className="usernameError">Invalid username</p> : null}
    </main>
  );
}

export default SignIn;
