import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ExpandableCommentContainer({ children }) {
  const [isClicked, setIsClicked] = useState(false);
  const lightTheme = useSelector((state) => state.themeKey);

  const handleClick = () => {
    setIsClicked((current) => {
      return !current;
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={"articlePageComments" + (lightTheme ? "" : " dark")}
      >
        Comments{" "}
        {isClicked ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
      </button>
      {isClicked && children}
    </>
  );
}
