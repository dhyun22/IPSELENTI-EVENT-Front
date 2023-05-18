import React from 'react';
import { animateScroll as scroll } from 'react-scroll';

function MovetoComment() {
  const handleClick = () => {
    scroll.scrollToBottom({ duration: 500, smooth: true, offset: -70 });
  };

  return (
    <button className='moving_button' onClick={handleClick}>댓글 보러가기</button>
  );
}

export default MovetoComment;