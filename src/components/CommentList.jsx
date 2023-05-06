import React, { useState } from 'react';
import Comment from './Comment';
import {FiChevronDown} from 'react-icons/fi'

function CommentList({ comments }) {
  const [visibleComments, setVisibleComments] = useState(5); // 처음에 보여줄 댓글 수

  // 더보기 버튼 클릭 시, 더 보여줄 댓글 수 증가
  const handleMoreButtonClick = () => {
    setVisibleComments(visibleComments + 10);
  };

  return (
    <div>
      {comments.slice(0, visibleComments).map((comment, index) => (
        <Comment key={index} comment_text={comment.comment_text} comment_id={comment.comment_id} time={comment.time} liked={comment.liked}/>
      ))}
      {visibleComments < comments.length && (
        <button className='more_btn' onClick={handleMoreButtonClick}>더보기<FiChevronDown/> </button>
      )}
    </div>
  );
}

export default CommentList;
