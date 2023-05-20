import React, { useState } from 'react';
import Comment from './Comment';
import CommentPage from '../pages/CommentPage';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';



const MainCommentList = ({ comments }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const handleShowAllComments = () => {
    setShowAllComments(true);
  };

  if (!showAllComments) {
    // 댓글이 5개 이상인 경우에만 전체 댓글 보기 버튼을 표시합니다.
    if (comments.length > 5) {
      return (
        <div className="comment-list">
          {comments.slice(0, 5).map((comment, index) => (
            <Comment
              key={index} comments={comment}/>
          ))}
          <Link to='/comment'>
            <button className='every_btn' onClick={handleShowAllComments}>전체 댓글 보기</button>
          </Link>
        </div>
      );
    }
    // 댓글이 5개 이하인 경우에는 전체 댓글 보기 버튼을 표시하지 않습니다.
    else {
      return (
        <div className="comment-list">
          {comments.map((comment, index) => (
            <Comment
              key={index} comments={comment}
            />
          ))}
        </div>
      );
    }
  } 
};


export default MainCommentList;