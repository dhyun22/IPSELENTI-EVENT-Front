import React, { useEffect, useState } from 'react';

function TimeLeft() {
  // 종료 시간 설정
  const endTime = new Date('2023-05-26T00:00:00Z');

  // 남은 시간 상태값
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  // 현재 시간과 종료 시간의 차이를 계산하는 함수
  function calculateRemainingTime() {
    const currentTime = new Date();
    const difference = endTime - currentTime;

    if (difference < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days,
      hours,
      minutes,
      seconds
    };
  }

  // 1초마다 남은 시간을 업데이트하는 useEffect 훅
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // JSX로 현재 남은 시간을 표시하는 부분
  return (
    <div className='Time'>
      <span className='remaintime'>{remainingTime.days}일 {remainingTime.hours}시간 {remainingTime.minutes}분 {remainingTime.seconds}초</span>
    </div>
  );
}

export default TimeLeft;  