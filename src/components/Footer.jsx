import { useSelector } from "react-redux";

export default function Footer() {
  const lightTheme = useSelector((state) => state.themeKey);

  return (
    <footer className={"footer" + (lightTheme ? "" : " dark")}>
      Yara Cremaschi 2023 ©
    </footer>
  );
}
