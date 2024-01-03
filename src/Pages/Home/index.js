import { useEffect, useState } from "react";
import Api from "../../services/api";
import { Link } from "react-router-dom";
import '../../index.css';
import './home.css';

function Home() {

	const [filmes, setFilmes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		async function loadFilmes() {
			const response = await Api.get("/movie/now_playing", {
				params: {
					api_key: "5a0a706bcc63dc0ebce7b51f06ce384c",
					language: "pt-BR",
					page: 1
				}
			})

			setFilmes(response.data.results.slice(0, 12));
			setLoading(false);
		}

		loadFilmes();

	}, []);

	if (loading) {
		return (
			<div className="loadingFilmes">
				<h2>Carregando filmes...</h2>
			</div>
		)
	}

	return (
		<div className="container">
			<div className="listaFilmes">
				{filmes.map((filme) => {
					return (
						<Link to={`/filme/${filme.id}`} key={filme.id}>
							<article>
								<div className="capaFilme">
									<img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
								</div>
								<p className="titleFilme">{filme.title}</p>
							</article>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

export default Home;