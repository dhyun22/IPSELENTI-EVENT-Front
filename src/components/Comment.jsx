
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {FcLike} from 'react-icons/fc';
import {BsThreeDotsVertical} from 'react-icons/bs';



function Comment ({ comments }) {
  const [likeCount, setLikeCount] = useState(comments.likes_count);
  const [commentID, setCommentID] = useState('');
  const [likerID, setLikerID] = useState('');
  
  const handleLikeClick = async () => {
    setLikeCount(likeCount + 1);
    try{
      const response = await axios.post('http://localhost:8080/comment/like', 
      {comment_id: commentID, liker_id: likerID},
      {withCredentials: true});
      if(response.status===200){
        console.log(response.data.message)
        setCommentID('');
        setLikerID('');
      }
      if(response.status===404){
        console.log(response.data.message)
      }}
      catch(error){
        console.error(error);
      }
    }
  


  return (
    <div className="comment">
      <div className="comment_header">
        {comments.author && comments.author !== '' && comments.name&&comments.name!==''&&
        <p className="comment_id">{comments.author.slice(2, 4)}학번 &nbsp;{comments.name[0]}ㅇㅇ</p>}
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