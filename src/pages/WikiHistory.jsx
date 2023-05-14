import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/dist';
import HistoryBox from '../components/Wiki/HistroyBox';
import axios from 'axios';


const WikiHistory = () => {
    const { id } = useParams();

    const [history, setHistory] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const [userid, setUserid] = useState(null);
    const [historyId, setHistoryId] = useState(null);
    const [isRollback, setIsRollback] = useState(null);
    const [version, setVersion] = useState(null);


    const getWiki = async () => {
    try{
            const result = await axios.get('http://localhost:8080//wiki/historys');
            setHistory(result.data.contents);
            setHistoryId(result.data.wiki_history_id);
            setTimestamp(result.data.edited_time);
            setUserid(result.data.editor_id);
            setIsRollback(result.data.is_rollback);
            setVersion(result.data.is_rollback);
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
                <div className='wiki-history'>
                    <h2>History</h2>
                    <div className='history-content'>
                        {history.map((item) => {
                            return(
                                <div key={historyId}>
                                   <HistoryBox ver={version} time={timestamp} studentid={userid} isrollback={isRollback}/>
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