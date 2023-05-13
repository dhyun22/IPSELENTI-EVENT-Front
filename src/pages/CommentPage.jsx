import React from 'react';
import logo from '../img/logo.png';
import CommentList from '../components/CommentList';
import ScrollToTopButton from '../components/ScrollToTopButton';
import axios from 'axios';
import {useEffect} from "react";
import {useState} from "react";

function CommentPage() {

    
    const [user, setUser] = useState('');
    
    const takeuser = async () => {
      try {
        const login = await axios.post("http://localhost:8080/user/auth/signin", {user_id: "7777777777", password:"rha1214!"}, {withCredentials:true})
        const response = await axios.get("http://localhost:8080/user/mypage/info", { withCredentials: true });
                
        if (response.data.success == true){
          setUser(response.data.user)
        } else {
          navigator('/Login')
        }
      } catch (error) {
        console.error(error);
      }
    } 
    


    const [comment, setComment] = useState([]);

    const getCommentByTime = async () => {
      try {
        const response = await axios.get('http://localhost:8080/comment/bytime', { withCredentials: true });
        const commentData = response.data.map(comment => ({
          id: comment.comment_id,
          author: comment.author,
          content: comment.comment_content,
          time: comment.comment_time,
          likes: comment.likes_count,
        }));
    
        if (commentData.length > 0) {
          setComment(commentData);
        } else {
          // 댓글이 없는 경우 처리
        }
      } catch (error) {
        console.error(error);
        // 오류 처리
      }
    };
    
    const getCommentByLike = async () => {
      try {
        const response = await axios.get('http://localhost:8080/comment/bylike', { withCredentials: true });
        const commentData = response.data.map(comment => ({
          id: comment.comment_id,
          author: comment.author,
          content: comment.comment_content,
          time: comment.comment_time,
          likes: comment.likes_count,
        }));
    
        if (commentData.length > 0) {
          setComment(commentData);
        } else {
          // 댓글이 없는 경우 처리
        }
      } catch (error) {
        console.error(error);
        // 오류 처리
      }
    };
    
    const handleSortLatest = () => {
      getCommentByTime();
    };
    
    const handleSortPopular = () => {
      getCommentByLike();
    };
    
    
    
    return (
<div className='container'>
<div className='mobile-view'>
    <div className='comment_content'>
        <div className='comment_head'>
            <h2 className='comment_head_title'>댓글</h2>
            <span className='comment_head_count'>899</span>
            <button onClick={handleSortLatest} className='comment_bytime'>최신순</button>
            <button onClick={handleSortPopular} className='comment_bylike'>인기순</button>
        </div>
        <div className='comment_writingbox'>
            <form className='comment_form'>
                <div className='comment_writing' id='comment_writing'>
                    <div className='comment_writing_inner' id='comment_writing_inner'>
                        <form className='comment_writing_area' id="comment_writing_area">
                            <div className='comment_writing_name'>
                                <span className='comment_writing_name'>
                                 &nbsp; 정ㅇㅇ
                                 </span>
                            </div>
                            <textarea rows="5" id='comment_writing_textarea' placeholder="댓글을 작성해주세요"></textarea>
                            <div className='comment_button' id='comment_button'>
                             <div className='comment_btn_wrapper'>
                                <button type="submit" className="comment_btn">
                                 &nbsp; 작성 &nbsp;
                                </button>
                             </div>
                            </div>
                        </form>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div className='comment_view'>
       <CommentList />
    </div>
    <div className='scrollup'>
        <ScrollToTopButton/>
    </div>


</div>
</div>
)
}


export default CommentPage;