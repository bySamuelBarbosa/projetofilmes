import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../services/api";
import './filme.css';
import { toast } from "react-toastify";

function Filme() {

	const { id } = useParams();
	const [filme, setFilme] = useState({});
	const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

	useEffect(() => {

		async function loadFilme() {
			await Api.get(`/movie/${id}`, {
				params: {
					api_key: "5a0a706bcc63dc0ebce7b51f06ce384c",
					language: "pt-BR"
				}
			})
				.then((response) => {
					console.log(response.data);
					setFilme(response.data);
					setLoading(false);
				})
				.catch(() => {
					navigate("/", { replace: true })
                    return;
				})
		}

		loadFilme();

	}, [id, navigate]);

    function salvarFilmeNaLista(){
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) ?? [];
        const filmeExisteNaLista = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(filmeExisteNaLista) {
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme adicionado à sua lista!");
    }

	if (loading) {
		return (
			<div className="loadFilme">
				<h1>Aguarde...</h1>
			</div>
		)
	}

	return (
		<div className="loadFilme">
			<div className="containerCima">
				<div className="cartazFilme">
					<img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
				</div>
			</div>

			<div className="containerBaixo">
				<h1>{filme.title}</h1>
				<div className="sinopseFilme">
				    <h3>Sinopse</h3>
                    <p>{filme.overview}</p>
                </div>
				<p className="avaliacaoFilme">Avaliação: {filme.vote_average} / 10 <span>({filme.vote_count} Votos)</span></p>

                <div className="area-buttons">
                    <button onClick={salvarFilmeNaLista}>+ Minha lista</button>
                    <a href={`//youtube.com/results?search_query=${filme.title} Trailer`} target="_blank" rel="noreferrer">Assistir trailer</a>
                    <a href={`//www.imdb.com/title/${filme.imdb_id}`} target="_blank" rel="noreferrer">Ver no IMDB</a>
                </div>
			</div>
		</div>
	)
}

export default Filme;