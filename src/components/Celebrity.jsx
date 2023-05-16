import React, { useState } from 'react';
import BettingModal from './BettingModal';
import {FiChevronDown} from 'react-icons/fi'

function Celebrity(celebList) {
  const [showMore, setShowMore] = useState(false); // 더보기 버튼 클릭 여부 상태값

  

  const [visibleCelebs, setVisibleCelebs] = useState(celebList ? celebList.slice(0, 3) : []);

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