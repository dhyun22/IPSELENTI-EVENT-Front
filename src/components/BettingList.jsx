import React, {useEffect} from "react";
import { useState } from "react";
import axios from 'axios';

function BettingList() {

  const [betHistory, setbetHistory] = useState([]);
  const [celebrities, setCelebrities]=useState([]);

  const takebet=async() => {
    try{
 
      const historylist= await axios.get(process.env.REACT_APP_HOST+"/user/mypage/bettinghistory", {withCredentials:true});

      if (historylist.data){ 
        setbetHistory(historylist.data.bettingHistory)
        const celebrityIds = historylist.data.bettingHistory.map(history => history.celebrity_id);
        const celebritiesResponse = await axios.get(process.env.REACT_APP_HOST + "/event/celebrities");
        const matchedCelebrities = celebritiesResponse.data.celebrities.filter(celebrity => celebrityIds.includes(celebrity.celebrity_id));
  
        setCelebrities(matchedCelebrities);
      }

    } catch (error) {
      console.error(error);
    }
  }
 
  useEffect(()=> {takebet();}, []);


  return(
      <ul className='betting_list' id='betting_list'>
        {betHistory.map((historylist, index) => (
          <li key={index}>
             <span>{historylist.celebrity_id}</span>
             {celebrities.map(celebrity => {
              if (celebrity.celebrity_id === historylist.celebrity_id) {
              return <span>&nbsp;&nbsp;&nbsp;&nbsp;{celebrity.celebrities_name}</span>;
             }
              return null;
              })}         
          </li>
          ))
        }
      </ul>
  
  );
};

export default BettingList;