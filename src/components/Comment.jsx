

import React from 'react';
import { useState } from 'react';
import {FcLike} from 'react-icons/fc'
import {BsThreeDotsVertical} from 'react-icons/bs'

const Comment = ({ comments }) => {
  const [likeCount, setLikeCount] = useState(comments.likes_count);
  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };
  

  return (
    <div className="comment">
      <div className="comment_header">
        <p className="comment_id">{comments.author}</p>
        <div className='comment_head_tools'>
                <BsThreeDotsVertical />
        </div>
      </div>
      <div className="comment_body">
        <p className="comment_text">{comments.comment_content}</p>
      </div>
      <div className='comment_footer'>
        <p className="comment_time">{comments.comment_time}</p>
        <p className='comment_liked' onClick={handleLikeClick}>
          <FcLike/>&nbsp;{comments.likes_count}</p>      
      </div>
    </div>
  );
};

export default Comment;