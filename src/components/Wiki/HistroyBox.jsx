import React from 'react';
import { Link } from "react-router-dom/dist";
import { useNavigate } from 'react-router-dom/dist'
import { useParams } from 'react-router-dom/dist';
import { useState } from 'react';

function WikiBox (props) {

  //const title = WikiToHtml(props.title);
  const ver = props.ver;
  const time = props.time;
  const studentid = props.studentid;
  const Navigator = useNavigate();
  const { id } = useParams();


  // const linkToWikiEdit = () => {
  //     Navigator(`/wikiedit/${index}`);
  
  // }

  // const [isOpen, setView] = useState(false);  // 메뉴의 초기값을 false로 설정
  
  // const toggleView = () => {
  //       setView(isOpen => !isOpen); // on,off 개념 boolean
  //   }
  const rollbackToThisVer = () => {

  };


  return (
    <div className="wiki-contents content-one" >
      <li>
        {ver} {time} {studentid}
        <span>{ver}로 되돌림</span>
        <button onClick={rollbackToThisVer} className='rollback-btn'>rollback</button>
      </li>
    </div>
  )
}
{/* <Link to="/wiki_edit"><button>편집</button></Link> */}

export default WikiBox