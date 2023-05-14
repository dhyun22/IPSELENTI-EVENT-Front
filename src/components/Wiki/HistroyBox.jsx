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

  const rollbackToThisVer = async () => {
    try {
        const result = await axios.post(`http://localhost:8080//wiki/historys/${ver}`);
        if (result.status === 200){
            Navigator('/wikishowversion', {state: {version: `${ver}`}});
        }
    } catch(error){console.log(error)};
    
};


  return (
    <div className="wiki-contents content-one" >
      <li>
        {ver} {time} {studentid}
        <span className={rollbacked ? 'rollback-span' : 'hidden'}>{ver}로 되돌림</span>
        <button onClick={rollbackToThisVer} className='rollback-btn'>rollback</button>
      </li>
    </div>
  )
}
{/* <Link to="/wiki_edit"><button>편집</button></Link> */}

export default WikiBox