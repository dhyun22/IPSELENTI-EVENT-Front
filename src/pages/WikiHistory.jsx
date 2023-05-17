import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom/dist';
import HistoryBox from '../components/Wiki/HistroyBox';
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
                "http://localhost:8080/user/auth/issignedin",
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
            const result = await axios.get('http://localhost:8080/wiki/historys', {
                withCredentials: true
            });
            setHistory(result.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        getWiki();

    }, []);




  return (
    <div class="container">
            <div class="mobile-view">
                <div className="header">
                    <Header />
                </div>
                <div className='wiki-history'>
                    <h2>History</h2>
                    <div className='history-content'>
                        {history.map((item) => {
                            return(
                                <div key={item.wiki_history_id}>
                                   <HistoryBox ver={item.text_pointer} time={item.edited_time} studentid={item.editor_id} isrollback={item.is_rollback}/>
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