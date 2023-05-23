import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist';
import { Link } from 'react-router-dom/dist';
import PrivactPolicy from '../pages/PrivactPolicy';

const Signout = () => {

  return (
    <div className='notion-box'>
        <a href='https://www.notion.so/_-a53f9a71fb8540588235471c7a5c42f7' className='notion-links'><span>&nbsp;개인정보처리방침&nbsp;&nbsp;&nbsp;</span></a>
        <a href='https://open.kakao.com/o/s74JtHlf' className='notion-links'> 
            <span>&#124;&nbsp;&nbsp;&nbsp;고객센터&nbsp;&nbsp;&nbsp;</span>
        </a>
        <a href='https://www.notion.so/ASKu-9d6da8cb08e640db8f746524c231937e?pvs=4' className='notion-links'> 
            <span>&#124;&nbsp;&nbsp;&nbsp;KUniverse&nbsp;</span>
        </a>
    </div>

  )
}

export default Signout