import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FcLike } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Comment = ({ comment_id, comment_text, time, liked }) => {
  const [likeCount, setLikeCount] = useState(liked);
  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };

  const [comment, setComment] = useState([]);

  const takecomment = async () => {
    try {
      const response = await axios.get('http://localhost:8080/comment/bytime', { withCredentials: true });
      const commenthis = response.data.map(comment => ({
        id: comment.comment_id,
        author: comment.author,
        content: comment.comment_content,
        time: comment.comment_time,
        likes: comment.likes_count,
      }));
      setComment(commenthis);
    } catch (error) {
      console.error(error);
    }
  };

  

  useEffect(() => {
    takecomment();
  }, []);

  return (
    <>
      {comment.map(c => (
        <div className="comment" key={c.id}>
          <div className="comment_header">
            <p className="comment_id">{c.id}</p>
            <div className="comment_head_tools">
              <BsThreeDotsVertical />
            </div>
          </div>
          <div className="comment_body">
            <p className="comment_text">{c.content}</p>
          </div>
          <div className="comment_footer">
            <p className="comment_time">{c.time}</p>
            <p className="comment_liked" onClick={handleLikeClick}>
              <FcLike />
              &nbsp;
              {c.likes}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comment;
