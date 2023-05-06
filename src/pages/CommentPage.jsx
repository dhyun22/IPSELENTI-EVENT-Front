import React from 'react';
import logo from '../img/logo.png';
import {BiInfoCircle} from 'react-icons/bi'
import CommentList from '../components/CommentList';

function CommentPage() {

    const comments = [
        { id: 1, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.', time: '4분 전', liked: '1'},
        { id: 2, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 3, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 4, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.', time: '4분 전', liked: '1' },
        { id: 5, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 6, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 7, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.', time: '4분 전', liked: '1' },
        { id: 8, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 9, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 10, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.', time: '4분 전', liked: '1' },
        { id: 11, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 12, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 13, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.', time: '4분 전', liked: '1' },
        { id: 14, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 15, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 16, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.', time: '4분 전', liked: '1' },
        { id: 17, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 18, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 19, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.' , time: '4분 전', liked: '1'},
        { id: 20, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 21, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 22, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.', time: '4분 전', liked: '1' },
        { id: 23, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 24, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 25, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.', time: '4분 전', liked: '1' },
        { id: 26, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 27, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 28, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 29, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 30, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.', time: '4분 전', liked: '1' },
        { id: 31, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 32, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        { id: 33, comment_id: 'Alice', comment_text: 'Lorem ipsum dolor sit amet.', time: '4분 전', liked: '1' },
        { id: 34, comment_id: 'Bob', comment_text: 'Consectetur adipiscing elit.', time: '4분 전', liked: '1' },
        { id: 35, comment_id: 'Charlie', comment_text: 'Pellentesque cursus euismod mauris.', time: '4분 전', liked: '1' },
        
        //... more comments
    ];
    return (
<div className='container'>
<div className='mobile-view'>
    <div className='comment_content'>
        <div className='comment_head'>
            <h2 className='comment_head_title'>댓글</h2>
            <span className='comment_head_count'>899</span>
            <div className='comment_head_tools'>
                <BiInfoCircle />
            </div>
        </div>
        <div className='comment_writingbox'>
            <form className='comment_form'>
                <div className='comment_writing' id='comment_writing'>
                    <div className='comment_writing_inner' id='comment_writing_inner'>
                        <form className='comment_writing_area' id="comment_writing_area">
                            <div className='comment_writing_name'>
                                <span className='comment_writing_name_comment_text'>
                                 &nbsp; 정ㅇㅇ
                                 </span>
                            </div>
                            <comment_textarea rows="5" id='comment_writing_comment_textarea' placeholder="댓글을 작성해주세요"></comment_textarea>
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
       <CommentList comments={comments} />
    </div>
</div>
</div>
)
}


export default CommentPage;