
import React from 'react';
import { useState } from 'react';
import Comment from './Comment';
import {FiChevronDown} from 'react-icons/fi'
import {useEffect} from "react";
import axios from 'axios';
function CommentList({ comments }) {
  const [visibleComments, setVisibleComments] = useState(5); // 처음에 보여줄 댓글 수
  const [changeLike, setChangeLike] = useState(0);
  const [comment, setComment] = useState([]);
  // 더보기 버튼 클릭 시, 더 보여줄 댓글 수 증가
  const handleMoreButtonClick = () => {
    setVisibleComments(visibleComments + 10);
  };

  const takeComment = async () => {
    try {
        const res  = await axios.get("http://localhost:8080/comment/bytime", {withCredentials:true})
        if (res.status===200) {
            setComment(res.data);
        }
        if(res.status===404) {
          console.log(res.data.message)
        }
    } catch(error) {
        console.error(error);
    }
  }
  useEffect(()=>{
    takeComment();
  }, [changeLike])
  return (
    <div>
      {comments.slice(0, visibleComments).map((comment, index) => (
        <Comment key={index} comments = {comment} changeLike={changeLike} setChangeLike={setChangeLike}/>
        /* <Comment key={index} comment_text={comment.comment_content} comment_id={comment.author} time={comment.comment_time
        } liked={comment.likes_count}/> */
      ))}
      {visibleComments < comments.length && (
        <button className='more_btn' onClick={handleMoreButtonClick}>더보기<FiChevronDown/> </button>
      )}
    </div>
  );
}

export default CommentList;