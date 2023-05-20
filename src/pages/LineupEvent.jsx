import {useState, useEffect} from 'react';
import AddLineupModal from '../components/AddLineupModal';
import BettingModal from '../components/BettingModal';
import ShareModal from '../components/ShareModal';
import Modal from 'react-modal';
import logo from '../img/logo.png';
import BettingButton from '../components/BettingButton';
import TimeLeft from '../components/TimeLeft'
import MainCommentList from '../components/MainCommentList';
import Celebrity from '../components/Celebrity';
import MovetoComment from '../components/MovetoComment';
import ScrollToTopButton from '../components/ScrollToTopButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import Header from '../components/Header';


function LineupEvent() {
    


    
   
    
    

    const [user, setUser] = useState('');
    
    const [comment, setComment] = useState([]);
    const [authorID, setAuthorID] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const Navigate = useNavigate();



   
    const takeuser = async () => {
        try {
          const response = await axios.get("http://localhost:8080/user/mypage/info", { withCredentials: true });
                  
          if (response.data.success == true){
            setUser(response.data.user)
          } else {
            navigator('/login')
          }
        } catch (error) {
          console.error(error);
        }
      }   


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

      const checkLoginStatus = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/user/auth/issignedin",
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setLoggedIn(true);
            } else{
                setLoggedIn(false);
                Navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }

    }

      const postComment = async () => {

        checkLoginStatus();
        try{
            const response = await axios.post('http://localhost:8080/comment', 
                {author: authorID, comment_content: commentContent}
            , {withCredentials: true});
            if (response.status===200) {
                console.log(response.data.message)
                setAuthorID('');
                setCommentContent('');
                takeComment();
            } 
            if(response.status===400){
                console.log(response.data.message)
            }
            if(response.status===404){
                console.log(response.data.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
   
      useEffect(() => {
        takeComment();
    }, []);



    const[celebrities, setCelebrities] = useState([]);
    const[bettingAmountSum, setBettingAmountSum] = useState([]);
    useEffect(() => {
        const takeCelebrities = async () => {
          try {
            const response = await axios.get("http://localhost:8080/event/celebrities", { withCredentials: true });
            if (response.status === 200) {
              const data = response.data;
              const celebritiesData = data.celebrities;
              const bettingAmountSumData = parseFloat(data.betting_amount_sum);
    
              const newCelebrities = celebritiesData.map((celebrity) => {
                const bettingAmount = parseFloat(celebrity.betting_amount);
                const percent = Math.round((bettingAmount / bettingAmountSumData) * 100);
                const betRate = parseFloat((bettingAmountSumData / bettingAmount).toFixed(2));
                return { ...celebrity, percent, betRate };
              });
    
              setCelebrities(newCelebrities);
              setBettingAmountSum(bettingAmountSumData);
            }
            if (response.status === 404) {
              console.log(response.data.message);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        takeCelebrities();
      }, []);
    
    

    return (
        <div className='container'>
           <div className='mobile-view'>
           <div id='mainpageheader'>
                <div className='headerContainer'>
                    <div className='logoContainer'>
                        <Link to='/'>
                         <img src={logo} alt='logo' id='mainpagelogo'></img>
                        </Link>
                        <Link to='/mypage'>
                            <div className='myPageButton'>
                                <FaUserAlt className='myPageIcon' />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            
                <div className='main_content'>
                    
                    
                        
                    
                    <div className='main_head'>
                        <h2 className='main_head_title'>입실렌티 라인업 예측</h2>
                        <AddLineupModal />
                    </div>
                    <div className='main_body'>
                        <div className='left_body'>
                            <span className='remaintime_text'>남은 시간</span>
                            <TimeLeft/>
                            <ShareModal/>
                        </div>
                        <div className='rignt_body'>
                            <span className='Totalpoint_text'>누적 포인트</span>
                            <span className='Totalpoint'>{bettingAmountSum}P</span>
                           <div className='move_comment'>
                            <MovetoComment/>
                            </div> 
                        </div>
                    </div>
                </div>
                    <div className='ranking_count'>
                        <Celebrity celebList={celebrities}/>
                    </div>
                    <div className='comment_content'>
                     <div className='comment_head'>
                        <h2 className='comment_head_title'>댓글</h2>
                     </div>
                     <div className='comment_writingbox'>
                         <form className='comment_form'>
                            <div className='comment_writing' id='comment_writing'>
                                <div className='comment_writing_inner' id='comment_writing_inner'>
                                    <form className='comment_writing_area' id="comment_writing_area">
                                    <div className='comment_writing_name'>
                                        {user.name && user.name !== '' && 
                                        <span className='comment_writing_name'>
                                            &nbsp; {user.name[0]}oo
                                        </span>}
                                    </div>
                                    <textarea 
                                     rows="5" 
                                     id='comment_writing_textarea' 
                                     placeholder="댓글을 작성해주세요"
                                     value={commentContent}
                                     onChange={e => setCommentContent(e.target.value)}
                                    >
                                    </textarea>
                                    <div className='comment_button' id='comment_button'>
                                         <div className='comment_btn_wrapper'>
                                             <button 
                                             type="submit" 
                                             className="comment_btn"
                                             onClick={postComment}>
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
                    
                <div className='comment_main'>
                  <MainCommentList comments={comment} />
                </div>

                <div className='go_to_celeb'>
                    <ScrollToTopButton/>
                </div>
            </div>                
                
                
        </div>
    );
};

export default LineupEvent;