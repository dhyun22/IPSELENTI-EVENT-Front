import logo from '../img/logo.png'
import { BsSearch } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import newBanner2 from '../img/newBanner2.png';

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
                        {/* <span>마이페이지</span> */}
                    </div>
                </Link>
            </div>
            <div className='searchBarContainer'>
                <input className='searchBar' placeholder='입실렌티' disabled={true}/>
                <Link to='/wiki'>
                    <div className='searchButton'>
                        <BsSearch className='search' />
                    </div>
                </Link>
                {/* <div className='searchBar'>
                    <span>입실렌티</span>
                    <Link to='/wiki'>
                        <div className='searchButton'>
                            <BsSearch className='search' />
                        </div>
                    </Link>
                </div> */}
            </div >
            <div>
                <Link to='/lineupevent'>
                    <img src={newBanner2}  className='banner' alt='banner'/>
                </Link>
            </div>
            
        </div>
    );
}
export default Header;