import axios from 'axios';
import React, { useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect } from 'react';

function Comment({ comments, changeLike, setChangeLike }) {
  const [likeCount, setLikeCount] = useState(comments.likes_count);
  const [commentID, setCommentID] = useState('');
  const [likerID, setLikerID] = useState('');
  const [alreadyLiked, setAlreadyLiked] = useState(false); // Added state to track if the comment was already liked

  const checkChangeLike = () => {
    if (changeLike === 0) {
      setChangeLike(1);
    } else {
      setChangeLike(0);
    }
  };

  const handleLikeClick = async () => {
    if (alreadyLiked) {
      alert('좋아요를 이미 눌렀습니다'); // Display alert if already liked
      return;
    }

    const updatedLikeCount = likeCount + 1;
    comments.likes_count += 1;
    setLikeCount(updatedLikeCount);
    try {
      const response = await axios.post(
        process.env.REACT_APP_HOST + '/comment/like',
        { comment_id: comments.comment_id, liker_id: comments.liker_id },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        setCommentID(comments.comment_id);
        setLikerID(comments.liker_id);
        checkChangeLike();
        setLikeCount(updatedLikeCount);
        setAlreadyLiked(true); // Set alreadyLiked state to true
      }
      if (response.status === 400) {
        console.log(response.data.message);
        alert(response.data.message);
      }
      if (response.status === 404) {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const time = new Date(comments.comment_time);
  const formattedTime = `${time.toLocaleDateString()} ${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;

  return (
    <div className="comment">
      <div className="comment_header">
        {comments.author && comments.author !== '' && comments.name && comments.name !== '' && (
          <p className="comment_id">
            {comments.author.slice(2, 4)}학번 &nbsp;{comments.name[0]}ㅇㅇ
          </p>
        )}
        <div className="comment_head_tools">
          <BsThreeDotsVertical />
        </div>
      </div>
      <div className="comment_body">
        <p className="comment_text">{comments.comment_content}</p>
      </div>
      <div className="comment_footer">
        <p className="comment_time">{formattedTime}</p>
        <p className="comment_liked" onClick={handleLikeClick}>
          <FcLike />
          &nbsp;{comments.likes_count}
        </p>
      </div>
    </div>
  );
}

export default Comment;
