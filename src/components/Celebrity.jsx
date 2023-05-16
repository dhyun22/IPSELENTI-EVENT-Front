import React, { useState } from 'react';
import BettingModal from './BettingModal';
import {FiChevronDown} from 'react-icons/fi'

function Celebrity() {
  const [showMore, setShowMore] = useState(false); // 더보기 버튼 클릭 여부 상태값

  const celebList = [
    {
      rank: 1,
      thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202304111337030.jpg',
      name: 'IVE(아이브)',
      betRate: '1.1',
      point: '12345 ',
      graphWidth: '70%',
      percent: '70%',
      myPoint: '20000',
      bettingAmount: '1500',
    },
    {
      rank: 2,
      thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
      name: '르세라핌',
      betRate: '1.1',
      point: '12345',
      graphWidth: '50%',
      percent: '50%',
      myPoint: '20000',
      bettingAmount: '2500'
    },
    {
      rank: 3,
      thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202212200942036.jpg',
      name: 'NewJeans',
      betRate: '1.1',
      point: '12345',
      graphWidth: '45%',
      percent: '45%',
      myPoint: '20000',
      bettingAmount: '2500',
    },
    {
      rank: 4,
      thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
      name: '박재범',
      betRate: '1.1',
      point: '12345',
      graphWidth: '40%',
      percent: '40%',
      myPoint: '20000',
      bettingAmount: '2500',
    },
    {
      rank: 5,
      thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
      name: '서동현',
      betRate: '1.1',
      point: '12345',
      graphWidth: '35%',
      percent: '35%',
      myPoint: '20000',
      bettingAmount: '2500',
    },
    {
        rank: 6,
        thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
        name: '10cm',
        betRate: '1.1',
        point: '12345',
        graphWidth: '30%',
        percent: '30%',
        myPoint: '20000',
        bettingAmount: '2500',
    },
    {
        rank: 7,
        thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
        name: '최영섭',
        betRate: '1.1',
        point: '12345',
        graphWidth: '25%',
        percent: '25%',
        myPoint: '20000',
        bettingAmount: '2500',
    },
    {
        rank: 8,
        thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
        name: '아이유',
        betRate: '1.1',
        point: '12345',
        graphWidth: '20%',
        percent: '20%',
        myPoint: '20000',
        bettingAmount: '2500',
    },
    {
        rank: 9,
        thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
        name: '에스파',
        betRate: '1.1',
        point: '12345',
        graphWidth: '15%',
        percent: '15%',
        myPoint: '20000',
        bettingAmount: '2500',
      },
    {
        rank: 10,
        thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
        name: '세븐틴',
        betRate: '1.1',
        point: '12345',
        graphWidth: '10%',
        percent: '10%',
        myPoint: '20000',
        bettingAmount: '2500',
    },
    {
        rank: 11,
        thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
        name: '멜로망스',
        betRate: '1.1',
        point: '12345',
        graphWidth: '5%',
        percent: '5%',
        myPoint: '20000',
        bettingAmount: '2500',
      },
      {
        rank: 12,
        thumb: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
        name: '최예나',
        betRate: '1.1',
        point: '12345',
        graphWidth: '1%',
        percent: '1%',
        myPoint: '20000',
        bettingAmount: '2500',
      },
    // ... 랭킹 정보 데이터 배열
  ];

  const [visibleCelebs, setVisibleCelebs] = useState(celebList.slice(0, 3)); 


  const handleShowMore = () => {setShowMore(true); 
  setVisibleCelebs(celebList);
  };// 더보기 버튼 클릭 시 상태값 변경

  return (
    <div className='ranking_list'>
      {visibleCelebs.map((celeb) => (
        <div className='info_box' key={celeb.rank}>
          <span className='celeb_rank'>{celeb.rank}</span>
          <div className='celeb_thumb'>
            <img id='celeb_thumb'src={celeb.thumb} alt={celeb.name} />
          </div>
          <div className='celeb_info'>
            <span id='celeb_name'>{celeb.name}</span>
            <span id='celeb_betrate'>{celeb.betRate}</span>
          </div>
          <div className='celeb_footer'>
            <span id='celeb_point'>{celeb.point}</span>
            <BettingModal
            celebName={celeb.name}
            voteRate={celeb.percent}
            profilePic={celeb.thumb}
            betPoint={celeb.point}
            betRank={celeb.rank}
            dividendRate={celeb.betRate}
            myPoint={celeb.myPoint}
            bettingAmount={celeb.bettingAmount}
            id='celeb_bet' />
          </div>
          <div className='celeb_graph'>
            <span id='celeb_per'>
              <span id='celeb_bg' style={{ width: celeb.percent }}></span>
            </span>
            <span className='celeb_per_text'>{celeb.percent}</span>
          </div>
        </div>
      ))}
    
    {!showMore && (
        <div className='show_more' onClick={handleShowMore}>
          <button id='celeb_showmore'>더보기<FiChevronDown/></button>
        </div>
      )}
    </div>);
};


export default Celebrity;