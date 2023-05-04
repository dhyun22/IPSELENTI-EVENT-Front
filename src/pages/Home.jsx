import Header from "../components/Header";
import { Link } from 'react-router-dom';
function Home() {
    return (

        <div className="container">
            <div className="mobile-view">
                    <div className="headerContainer"> 
                        <Header />
                    </div>
                    <div className="body">
                        <Link to='/wiki'>
                            <button className="redbutton">입실렌티 함께하기!</button>
                        </Link>
                    </div>
            </div>
        </div>


        
        
    );
}

export default Home;