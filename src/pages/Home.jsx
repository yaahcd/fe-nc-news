import ListOfArticles from "../components/ListOfArticles";

function Home() {
	return (
		<>
		<div className="headerContainer">
			<h1 className="header"> NC News</h1>
		</div>

		<section className="articlesContainer">
			<ListOfArticles />
		</section>
		</>
	);
}

export default Home;
