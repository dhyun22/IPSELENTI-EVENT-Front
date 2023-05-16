import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/dist';
import HistoryBox from '../components/Wiki/HistroyBox';
import axios from 'axios';
import Header from '../components/Header';

// const his = [{
//   "wiki_history_id": 4,
//   "editor_id": "2020171027",
//   "text_pointer": "r3",
//   "edited_time": "2023-05-09T11:08:51.000Z",
//   "is_rollback": 1
//  },
//  {
//   "wiki_history_id": 3,
//   "editor_id": "202017102a7",
//   "text_pointer": "r2",
//   "edited_time": "2023-05-05T10:16:51.000Z",
//   "is_rollback": 0
//  },
//  {
//   "wiki_history_id": 2,
//   "editor_id": "2020171027",
//   "text_pointer": "r1",
//   "edited_time": "2023-05-05T10:16:20.000Z",
//   "is_rollback": 0
//  }
// ];


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
            setVersion(result.data.text_pointer);
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