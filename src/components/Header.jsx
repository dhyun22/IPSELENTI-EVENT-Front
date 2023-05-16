import logo from '../img/logo.png';
import { BsSearch } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import banner from '../img/banner.png';

function Header() {
    return(
        <div className='header'>
            <div className='logoContainer'>
                <Link to='/'>
                    <img src={logo} alt='logo' className='logo'></img>
                </Link>
                <Link to='/mypage'>
                    <div className='myPageButton'>
                        <FaUserAlt className='myPageIcon' />
                    </div>
                </Link>
            </div>
            <div className='searchBarContainer'>
                <input className='searchBar' placeholder='입실렌티'/>
                <Link to='/wiki'>
                    <div className='searchButton'>
                        <BsSearch className='search' />
                    </div>
                </Link>
            </div>
            <Link to='/lineupevent'>
                    <img src={banner} className='banner' alt='banner'/>
            </Link>
        </div>
    );
}
export default Header;