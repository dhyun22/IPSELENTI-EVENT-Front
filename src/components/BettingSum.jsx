import { useState, useEffect } from 'react';
import axios from 'axios';

function BettingSum() {
  const [totalBettingPoint, setTotalBettingPoint] = useState(0);

  const takeSum = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_HOST + '/user/mypage/bettinghistory', { withCredentials: true });
      if (response.data) {
        const bettingHistory = response.data.bettingHistory;
        const totalBettingPoint = bettingHistory.reduce((acc, curr) => acc + curr.betting_point, 0);
        setTotalBettingPoint(totalBettingPoint);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    takeSum();
  }, []);

  return (
    <span>{totalBettingPoint}</span>
  );
}

export default BettingSum;
