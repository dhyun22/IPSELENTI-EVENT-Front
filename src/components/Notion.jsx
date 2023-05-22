import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist';
import { Link } from 'react-router-dom/dist';

const Signout = () => {

  return (
    <div className='notion-box'>
        <a href='../pages/privatepolicy.html' className='notion-links'><span>&nbsp;개인정보처리방침&nbsp;&nbsp;&nbsp;</span></a>
        <a href='https://open.kakao.com/o/s74JtHlf' className='notion-links'> 
            <span>&#124;&nbsp;&nbsp;&nbsp;고객센터&nbsp;&nbsp;&nbsp;</span>
        </a>
        <a href='https://www.notion.so/034179/KUniverse-cca7a0980e7f4b0c9994b8fe086e7728' className='notion-links'> 
            <span>&#124;&nbsp;&nbsp;&nbsp;KUniverse&nbsp;</span>
        </a>
    </div>

  )
}

export default Signout