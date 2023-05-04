import Header from "../components/Header";

function Home() {
    return (

        <div className="container">
            <div className="mobile-view">
                    <div className="headerContainer"> 
                        <Header />
                    </div>
                    <div className="body">
                        <button className="redbutton">입실렌티 함께하기!</button>
                    </div>
            </div>
        </div>


        
        
    );
}

export default Home;