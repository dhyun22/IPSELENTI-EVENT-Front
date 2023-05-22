import React, { useEffect, useState } from "react";
import axios from 'axios';


function BettingList() {
  const [betHistory, setBetHistory] = useState([]);
  const [celebrities, setCelebrities] = useState([]);



  const takeBet = async () => {
    try {
      const historylist = await axios.get(process.env.REACT_APP_HOST + "/user/mypage/bettinghistory", { withCredentials: true });

      if (historylist.data) {
        setBetHistory(historylist.data.bettingHistory);

        const celebrityIds = historylist.data.bettingHistory.map(history => history.celebrity_id);
        const celebritiesResponse = await axios.get(process.env.REACT_APP_HOST + "/event/celebrities");
        const matchedCelebrities = celebritiesResponse.data.celebrities.filter(celebrity => celebrityIds.includes(celebrity.celebrity_id));

        setCelebrities(matchedCelebrities);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    takeBet();
  }, []);

  




  return (
    <ul className='betting_list' id='betting_list'>
      {betHistory.map((historylist) => {
        const matchedCelebrity = celebrities.find(celebrity => celebrity.celebrity_id === historylist.celebrity_id);
        const time = new Date(historylist.betting_time);
        const formattedTime = `${time.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;

        return (
          <li key={historylist.betting_id}>
            {matchedCelebrity && <span>{matchedCelebrity.celebrities_name}</span>}
            <span>&nbsp;{historylist.betting_point}P</span>
            <span id="bettingtime">&nbsp;{formattedTime}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default BettingList;
