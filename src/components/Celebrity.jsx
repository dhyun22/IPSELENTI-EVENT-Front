import React, { useState } from 'react';
import BettingModal from './BettingModal';
import {FiChevronDown} from 'react-icons/fi'
import { useEffect } from 'react';
function Celebrity(props) {
  const celebList = [
    {
      rank: 1,
      celebrity_image: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202304111337030.jpg',
      celebrities_name: 'IVE(아이브)',
      betRate: '1.1',
      point: '12345 ',
      graphWidth: '70%',
      percent: '70%',
      myPoint: '20000',
      betting_Amount: '1500',
    },
    {
      rank: 2,
      celebrity_image: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202305021004012.jpg',
      celebrities_name: '르세라핌',
      betRate: '1.1',
      point: '12345',
      graphWidth: '50%',
      percent: '50%',
      myPoint: '20000',
      betting_Amount: '2500'
    },
    {
      rank: 3,
      celebrity_image: 'https://www.akbobada.com/home/akbobada/archive/akbo/img/202212200942036.jpg',
      celebrities_name: 'NewJeans',
      betRate: '1.1',
      point: '12345',
      graphWidth: '45%',
      percent: '45%',
      myPoint: '20000',
      betting_Amount: '2500',
    },] 
  const [showMore, setShowMore] = useState(false); // 더보기 버튼 클릭 여부 상태값
  // const [celebrank, setCelebrank] = useState(0); // 셀럽 등수


  

  const [visibleCelebs, setVisibleCelebs] = useState(celebList.slice(0, 3));
  useEffect(() => {setVisibleCelebs(celebList.slice(0,3));}, [celebList]); 


  const handleShowMore = () => {setShowMore(true); 
  setVisibleCelebs(celebList);
  };// 더보기 버튼 클릭 시 상태값 변경

  return (
    <div className='ranking_list'>
      {visibleCelebs.map((celeb, index) => (
        <div className='info_box' key={celeb.celebrity_id}>
          <span className='celeb_rank'>{celeb.celebrity_id}</span>
          <div className='celeb_thumb'>
            <img id='celeb_thumb'src={celeb.celebrity_image} alt={celeb.celebrities_name} />
          </div>
          <div className='celeb_info'>
            <span id='celeb_name'>{celeb.celebrities_name}</span>
            <span id='celeb_betrate'>{celeb.betRate}</span>
          </div>
          <div className='celeb_footer'>
            <span id='celeb_point'>{celeb.betting_amount} P</span>
            <BettingModal
            celebId={celeb.celebrity_id}
            celebName={celeb.celebrities_name}
            voteRate={celeb.percent}
            profilePic={celeb.celebrity_image}
            betPoint={celeb.betting_Amount}
            betRank={celeb.rank}
            dividendRate={celeb.betRate}
            myPoint={celeb.myPoint}
            id='celeb_bet' />
          </div>
          <div className='celeb_graph'>
            <span id='celeb_per'>
              <span id='celeb_bg' style={{ width: celeb.percent }}></span>
            </span>
            <span className='celeb_per_text'>{celeb.percent} %</span>
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