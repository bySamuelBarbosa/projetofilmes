import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

function Favoritos() {

	const [filmes, setFilmes] = useState([]);

	useEffect(() => {
		const minhaLista = localStorage.getItem("@primeflix");

		setFilmes(JSON.parse(minhaLista) ?? []);

	}, [])

    function removerFilme(idFilme){
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== idFilme);
        });

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso!");
    }

	return (
		<section className='sectionMinhaLista'>
			<div className='conteudoMinhaLista'>
				<h1>Minha lista</h1>

                {filmes.length === 0 && <span>Você não tem nenhum filme salvo na sua lista!</span>}

				<ul>
					{filmes.map((filme) => {
						return (
							<li key={filme.id}>
								<img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
								<div className='titleDescricao'>
									<p className='title'>{filme.title}</p>
									<p className='descricao'>{filme.overview}</p>
									<div className='btnsFilmeLista'>
										<button onClick={() => removerFilme(filme.id)}>Remover</button>
										<Link to={`/filme/${filme.id}`}>Ver mais</Link>
									</div>
								</div>
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	)
}

export default Favoritos;