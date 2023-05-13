import React, { useState } from 'react';
import Comment from './Comment';
import CommentPage from '../pages/CommentPage';
import ReactDOM from 'react-dom';


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
          {comments.slice(0, 5).map(comment => (
            <Comment
              key={comment.comment_id}
              comment_id={comment.comment_id}
              comment_text={comment.comment_text}
              time={comment.time}
              liked={comment.liked}
            />
          ))}
          <button onClick={handleShowAllComments}>전체 댓글 보기</button>
        </div>
      );
    }
    // 댓글이 5개 이하인 경우에는 전체 댓글 보기 버튼을 표시하지 않습니다.
    else {
      return (
        <div className="comment-list">
          {comments.map(comment => (
            <Comment
              key={comment.comment_id}
              comment_id={comment.comment_id}
              comment_text={comment.comment_text}
              time={comment.time}
              liked={comment.liked}
            />
          ))}
        </div>
      );
    }
  } else {
    // CommentPage를 새 창으로 열도록 코드를 추가합니다.
    const commentPageWindow = window.open();
    commentPageWindow.document.title = '전체 댓글 보기';
    ReactDOM.render(<CommentPage comments={comments} />, commentPageWindow.document.body);
    return null;
  }
};


export default MainCommentList;