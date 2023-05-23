import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom/dist';
import HistoryBox from '../components/HistroyBox';
import axios from 'axios';
import Header from '../components/Header';


const WikiHistory = () => {
    const { id } = useParams();

    const [history, setHistory] = useState([]);

    const [loggedIn, setLoggedIn] = useState(false);
    const Navigate = useNavigate();

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_HOST+"/user/auth/issignedin",
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setLoggedIn(true);
            } else{
                setLoggedIn(false);
	            Navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }

    }


    useEffect (() => {
        checkLoginStatus();
    }, []);

    const getWiki = async () => {
        try{
            const result = await axios.get(process.env.REACT_APP_HOST+'/wiki/historys', {
                withCredentials: true
            });
            if(result.status === 200){
                setHistory(result.data);
            } else if(result.status === 401){
                alert(result.data.message);
                Navigate('/login');
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        getWiki();

    }, []);


  const time = new Date(item.edited_time);
  const formattedTime = `${time.toLocaleDateString()} ${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}:${time.getSeconds() < 10 ? '0' : ''}${time.getSeconds()}`;

  return (
    <div class="container">
            <div class="mobile-view">
                <div className="headerContainer">
                    <Header />
                </div>
                <div className='wiki-history'>
                    <h2>History</h2>
                    <div className='history-content'>
                        {history.map((item) => {
                            return(
                                <div key={item.wiki_history_id}>
                                   <HistoryBox ver={item.text_pointer} time={formattedTime} studentid={item.editor_id} isrollback={item.is_rollback}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default WikiHistory