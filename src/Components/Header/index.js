import './header.css';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<Link className="logoHeader" to="/">Prime Flix</Link>
			<Link className="favoritosHeader" to="/favoritos">Minha lista</Link>
		</header>
	)
}

export default Header;