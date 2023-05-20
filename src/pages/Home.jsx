import Header from "../components/Header";
import { Link } from 'react-router-dom';
import homeCharacter from '../img/haho_standing.png';
function Home() {
    return (

        <div className="container">
            <div className="mobile-view">
                    <div className="headerContainer"> 
                        <Header />
                    </div>
                    <div className="homeContainer">
                        <p className="homeText1">올해는 누구 오려나..</p>
                        <p className="homeText2">입장은 몇시부터?</p>
                        <p className="homeText3">뭐 입고 가지?</p>
                        <p className="homeText4">점심은 어떡하지?</p>
                        <img className='homeCharacter' src={homeCharacter} alt="haho" />
                        <Link to='/lineupevent'>
                            <button className="redbutton2">입실위키</button>
                        </Link>
                        <Link to='/wiki'>
                            <button className="redbutton">라인업 예측</button>
                        </Link>
                    </div>
            </div>
        </div>


        
        
    );
}

export default Home;