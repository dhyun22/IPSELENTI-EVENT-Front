import React, {useEffect} from "react";
import { useState } from "react";
import axios from 'axios';

function BettingList() {

  const [betHistory, setbetHistory] = useState([]);

  const takebet=async() => {
    try{
 
      const historylist= await axios.get("http://localhost:8080/user/mypage/bettinghistory", {withCredentials:true});

      if (historylist.data){ 
        setbetHistory(historylist.data.bettingHistory)
      }
    } catch (error) {
      console.error(error);
    } 
  }
 
  useEffect(()=> {takebet();}, []);


  return(
      <ul className='betting_list' id='betting_list'>
        {betHistory.map((historylist) => (
          <li>
             <span>{historylist.celebrity_id}</span>
             <span>&nbsp;&nbsp;&nbsp;&nbsp;{historylist.betting_point}P</span>   
          </li>
          ))
        }
      </ul>
  
  );
};

export default BettingList;