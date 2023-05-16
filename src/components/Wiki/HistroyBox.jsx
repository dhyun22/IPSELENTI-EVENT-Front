import React from 'react';
import { Link } from "react-router-dom/dist";
import { useNavigate } from 'react-router-dom/dist'
import { useParams } from 'react-router-dom/dist';
import { useState } from 'react';
import axios from 'axios';

function WikiBox (props) {

  //const title = WikiToHtml(props.title);
  const ver = props.ver;
  const time = props.time;
  const studentid = props.studentid;
  const Navigator = useNavigate();
  const rollbacked = props.isrollback;
  const { id } = useParams();

  const rollbackToThisVer = () => {
    Navigator('/wikishowversion', {state:{ver}});
    
};


  return (
    <div className="wiki-contents content-one" >
      <li className='rollback-box'>
        <span>{ver}&ensp;{time}&ensp;{studentid}</span>
        <span className={rollbacked ? 'rollback-span' : 'hidden'}>(r{rollbacked}로 되돌림)</span>
        <button onClick={rollbackToThisVer} className='rollback-btn'>롤백</button>
      </li>
    </div>
  )
}
{/* <Link to="/wiki_edit"><button>편집</button></Link> */}

export default WikiBox