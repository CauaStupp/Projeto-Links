import './Header.css';
import { CiLogout } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase'; 
import { signOut } from 'firebase/auth'; 

const Header = () => {

    async function logout() {
        await signOut(auth);
    }

  return (
    <header className='header'>
        <nav className='header-nav'>
            <button onClick={logout}>
                <CiLogout size={30} color='tomato'/>
            </button>
            
            <Link to='/admin'>
                Links
            </Link>
            <Link to='/admin/social'>
                Redes Sociais
            </Link>
        </nav>
    </header>
  )
}


export default Header;