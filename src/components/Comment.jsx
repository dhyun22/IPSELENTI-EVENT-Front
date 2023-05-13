import React from 'react';
import { useState } from 'react';
import {FcLike} from 'react-icons/fc'
import {BsThreeDotsVertical} from 'react-icons/bs'

const Comment = ({ comment_id, comment_text, time, liked }) => {
  const [likeCount, setLikeCount] = useState(liked);
  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };


  return (
    <div className="comment">
      <div className="comment_header">
        <p className="comment_id">{comment_id}</p>
        <div className='comment_head_tools'>
                <BsThreeDotsVertical />
        </div>
      </div>
      <div className="comment_body">
        <p className="comment_text">{comment_text}</p>
      </div>
      <div className='comment_footer'>
        <p className="comment_time">{time}</p>
        <p className='comment_liked' onClick={handleLikeClick}>
          <FcLike/>&nbsp;{likeCount}</p>      
      </div>
    </div>
  );
};

export default Comment;