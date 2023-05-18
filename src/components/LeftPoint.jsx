import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import {TbCoin} from 'react-icons/tb';
import BettingSum from './BettingSum';


function LeftPoint() {
  const [leftbetpoint, setleftbetpoint] = useState(0);

  const takeminus = async() => {
    try{
      const response = await axios.get('http://localhost.8080/user/mypage/info')
     if (response.data){
      const leftbetpoint = response.data.user.point - <BettingSum/>;
      setleftbetpoint(leftbetpoint);
     }
    } catch(error) {
        console.error(error);
      }
  };

  useEffect(()=>{takeminus();}, []);

  return (
  <span> {leftbetpoint} </span>
  )
 
     

}



export default LeftPoint;
