import './Error.css';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';

const Error = () => {
    return (
        <div className='container-error'>
            <Logo/>
            <h1>Página não encontrada</h1>
            <p>Está página não corresponde com a URL ou não existe.</p>
            <Link className='container-error-link' to='/'>
                Voltar Para Página Inicial
            </Link>
        </div>
    );
}


export default Error;