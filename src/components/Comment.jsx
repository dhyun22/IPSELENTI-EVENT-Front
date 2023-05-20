
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {FcLike} from 'react-icons/fc';
import {BsThreeDotsVertical} from 'react-icons/bs';
import { useEffect } from 'react';



function Comment ({ comments, changeLike, setChangeLike }) {
  const [likeCount, setLikeCount] = useState(comments.likes_count);
  const [commentID, setCommentID] = useState('');
  const [likerID, setLikerID] = useState('');

  
 
  


  const checkChangeLike = () => {
    if (changeLike === 0){
      setChangeLike(1);
    }
    else {
      setChangeLike(0);
    }
  };
  
  const handleLikeClick = async () => {
    const updatedLikeCount = likeCount +1;
    comments.likes_count += 1;
    setLikeCount(updatedLikeCount);
    try{
      const response = await axios.post(process.env.REACT_APP_HOST+'/comment/like', 
      {comment_id: comments.comment_id, liker_id: comments.liker_id},
      {withCredentials: true});
      
      if(response.status===200){
        console.log(response.data.message)
        setCommentID(comments.comment_id);
        setLikerID(comments.liker_id);
        checkChangeLike();
        setLikeCount(updatedLikeCount)
      }
      if(response.status===400){
        console.log(response.data.message)
        alert(response.data.message)
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
        <span className='comment_id2'>{comments.comment_id}</span>
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
  )
};

export default Comment;