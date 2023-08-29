import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PageProvider } from "./context/PageContext";
import ListOfArticles from "./components/ListOfArticles"
import SingleArticle from "./components/SingleArticle";
import InvalidPath from './components/InvalidPath';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./components/SignIn";
import MyAccount from "./components/MyAccount";
import PostArticle from "./components/PostArticle";
import SignUp from "./components/Signup";
import { useEffect } from "react";


function App() {




  useEffect(() =>  {
    
  }, [])

  return (
    <PageProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListOfArticles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="*" element={<InvalidPath />} />
        <Route path="/my_account" element={<PrivateRoute />}>
					<Route path="/my_account" element={<MyAccount />} />
				</Route>
        <Route path="/sign_in" element={<SignIn/>} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/post_article" element={<PostArticle />} />
      </Routes>
      <Footer/>
    </PageProvider>
  );
}

export default App;
