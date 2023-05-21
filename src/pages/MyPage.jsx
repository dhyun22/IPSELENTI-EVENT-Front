import React from 'react';
import {Link} from 'react-router-dom';
import {FaRegUser} from 'react-icons/fa';
import {FaRegSmile} from 'react-icons/fa';
import {AiOutlineNumber} from 'react-icons/ai';
import logo from '../img/logo.png';
import axios from 'axios';
import {useState, useEffect} from 'react';
import BettingSum from '../components/BettingSum';
import LeftPoint from '../components/LeftPoint';
import {TbCoin} from 'react-icons/tb';
import BettingList from '../components/BettingList';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Signout from '../components/Signout';




function MyPage() {
  const [user, setUser] = useState('');
  const [betting, setBetting] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST + '/user/auth/issignedin',
          {
            withCredentials: true,
          }
        );

        if (response.status === 201) {
          setLoggedIn(true);
          takeuser(); //로그인 성공 시에만 불러옴
        } else if (response.status === 401) {
          setLoggedIn(false);
          Navigate('/login');
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLoginStatus();
  }, [Navigate]);

  if (!loggedIn) {
    Navigate('/login');
    return null;
  }

    const takeuser = async () => {
      try{
        //const login = await axios.post(process.env.REACT_APP_HOST+"/user/auth/signin", {user_id: "7777777777", password:"rha1214!"}, {withCredentials:true});
        
        const response = await axios.get(process.env.REACT_APP_HOST+"/user/mypage/info", {withCredentials: true});
        
        if (response.data.success === true){
          setUser(response.data.user)
        } else{ Navigate('/login');
        }
      } catch (error) {
        console.error(error);
      }
    } 
      
    


  
  

  return (
    <div className='container'>
    <div className='mobile-view'>
       <div id='mypageheader'>
                <div className='headerContainer'>
                    <div className='logoContainer'>
                        <Link to='/'>
                         <img src={logo} alt='logo' id='mypagelogo'></img>
                        </Link>
                    </div>
                </div>
        </div>

      <div className='mypage_content'>
       
        <div className='mypage'>
          <h2 className='mypage_text'>마이페이지</h2>
        </div>
        <div className='welcome_message'>
          <span>{user.name}님 안녕하세요!</span>
        </div>
        <div className='account_box' id='account_box'>
          <div className='title' id='account_title'>
            <h3 className="title_text" id='account_text'>내프로필</h3>
          </div>
          <ul className="account_row" id='account_row'>
            <li className='account_list'>
              <div className="row_itemname">
                <FaRegUser />
                  <span className="item_text"> &nbsp;{user.name}</span>
              </div>
            </li>

            
            <li className='account_list'>
              <div className='row_nick'>
                <FaRegSmile/>
                {user.name && user.name !== '' &&
                <span className='item_text'> &nbsp;{user.name[0]}oo</span>
                }              
              </div>
            </li>

           
           <li className='account_list'>
              <div className="row_schoolid">
                <AiOutlineNumber/>
                  <span className='item_text'> &nbsp;{user.user_id}</span>
              </div>
           </li>
          </ul>  
       </div>

        <div className='betting_box' id='betting_box'>
          <div className="title" id='betting_title'>
           <h3 className="title_text" id='betting_text'>배팅현황</h3>
          </div>
          <ul className="betting_row" id='betting_row'>
            <li className='betting_info'>
              <div className="row_itemleft">
                <TbCoin/><span className="item_text" id='row_itemleft'> &nbsp;잔여 포인트 : &nbsp;{user.point} P</span>
              </div>
            </li>

            <li className='betting_info'>
              <div className="row_itemused">
               <TbCoin/><span className="item_text" id='row_itemused'> &nbsp;배팅 포인트 : &nbsp;<BettingSum/> P</span>
              </div>
            </li>
          </ul> 

          <div className='betting_list_box' id="betting_list_box">
            <BettingList/>
          </div>
        </div>
      </div>
      <Signout />
    </div>
    </div>
  )
    
} 
    
    
 
export default MyPage;