import React from 'react';
import {Link} from 'react-router-dom';
import {FaRegUser} from 'react-icons/fa';
import {FaRegSmile} from 'react-icons/fa';
import {AiOutlineNumber} from 'react-icons/ai';
import {TbCoin} from 'react-icons/tb';
import logo from '../img/logo.png';


function MyPage() {
  return (
    <div className='container'>
      <div className='content'>
        <div className='myPageLogo'>
          <img className='logo' src={logo} alt='logo' />
        </div>
        <div className='mypage'>
          <h2 className='mypage_text'>마이페이지</h2>
        </div>
        <div className='welcome_message'>
          <span>정다현님 안녕하세요!</span>
        </div>
        <div className='account_box' id='account_box'>
          <div className='title' id='account_title'>
            <h3 className="title_text" id='account_text'>내프로필</h3>
          </div>
          <ul className="account_row" id='account_row'>
            <li className='account_list'>
              <div className="row_itemname">
                <FaRegUser />
                  <span className="item_text"> &nbsp;정다현</span>
              </div>
            </li>

            
            <li className='account_list'>
              <div className='row_nick'>
                <FaRegSmile/>
                  <span className='item_text'> &nbsp;정oo</span>
              </div>
            </li>

           
           <li className='account_list'>
              <div className="row_schoolid">
                <AiOutlineNumber/>
                  <span className='item_text'> &nbsp;2019140004</span>
              </div>
           </li>
          </ul>  
       </div>

        <div className='betting_box' id='betting_box'>
          <div className="title" id='betting_title'>
           <h3 className="title_text" id='betting_text'>배팅현황</h3>
          </div>
          <ul className="betting_row" id='betting_row'>
            <li>
              <div className="row_itemleft">
                <TbCoin/>
                  <span className="item_text" id="row_itemleft"> &nbsp;잔여 포인트 : 15000 P</span>
              </div>
           </li>

            <li>
              <div className="row_itemused">
                <TbCoin/>
                 <span className="item_text" id='row_itemused'> &nbsp;배팅 포인트 : 15000 P</span>
              </div>
            </li>
          </ul> 

          <div className='betting_list_box' id="betting_list_box">
            <ul className='betting_list' id='betting_list'>
              <li>
                <span className='first' id='first_bet'>르세라핌 &nbsp;15000P</span>
              </li>
              <li>
                <span className='second' id='second_bet'>뉴진스 &nbsp;15000P</span>
              </li>
              <li>
                <span className='third' id='third_bet'>아이브 &nbsp;15000P</span>
              </li>
              <li>
                <span className='fourth' id='fourth_bet'>서동현 &nbsp;15000P</span>
              </li>
              <li>
                <span className='fifth' id='fifth_bet'>세븐틴 &nbsp;15000P</span>
              </li>
              <li>
                <span className='sixth' id='sixth_bet'>아이유 &nbsp;15000P</span>
              </li>
              <li>
                <span className='seventh' id='seventh_bet'>수지 &nbsp;15000P</span>
              </li>
              <li>
                <span className='eighth' id='eighth_bet'>박재범 &nbsp;15000P</span>
              </li>
              <li>
                <span className='nineth' id='nineth_bet'>싸이 &nbsp;15000P</span>
              </li>
              <li>
                <span className='nineth' id='nineth_bet'>최영섭 &nbsp;15000P</span>
              </li>
            </ul>
          </div>
          <div className='customer_box' id='customer_box'>
            <div className="title" id='customer_title'>
              <h3 className="title_text" id='customer_text'>고객센터</h3>
            </div>
          </div>

          <div className='askupagemove_box' id='askupagemove_box'>
            <div className="title" id='askupagemove_title'>
              <h3 className="title_text" id='askupagemove_text'>ASKu페이지</h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
} 
    
    
 
export default MyPage;