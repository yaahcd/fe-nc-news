import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/ncnewslogo.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import PageContext from "../context/PageContext";


function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const { user } = useContext(PageContext);

  if (!lightTheme) {
    document.getElementById("themeToggle").className = "dark";
  } else {
    document.getElementById("themeToggle").className = "";
  }

  

  return (
    <>
      <img
        className="logo"
        src={logo}
        alt=""
        onClick={() => {
          navigate("/");
        }}
      />
      <nav className={"navbar" + (lightTheme ? "" : " dark")}>
        <IconButton
          className={"themeButton" + (lightTheme ? "" : " dark")}
          onClick={() => {
            dispatch(toggleTheme())
          }}
        >
          {lightTheme && <LightModeIcon />}
          {!lightTheme && <DarkModeIcon />}
        </IconButton>
        <ul className={"navOptions" + (lightTheme ? "" : " dark")}>
          <Link to="/" className="noShow">
            <li>Home</li>
          </Link>
          <Link to="/post_article">
            <li>New Article</li>
          </Link>
          <Link to="/my_account">
            <li>My Account</li>
          </Link>
          {user ? (
            <Link className="lastItem noShow">
              {" "}
              <li>Hello {user}!</li>
            </Link>
          ) : (
            <Link className="lastItem noShow" to="/sign_in">
              <li>Sign in</li>
            </Link>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
