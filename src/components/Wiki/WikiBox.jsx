import React from 'react';
import { Link } from "react-router-dom/dist";
import WikiToHtml from './WikiToHtml';
import { useNavigate } from 'react-router-dom/dist'
import { useParams } from 'react-router-dom/dist';
import { useState } from 'react';

function WikiBox (props) {

  //const title = WikiToHtml(props.title);
  const title = props.title;
  const content = WikiToHtml(props.content);
  const index = props.index;
  const Navigator = useNavigate();
  const { id } = useParams();


  const linkToWikiEdit = () => {
      Navigator(`/wikiedit/${index}`, {status: index});
  
  }

  const [isOpen, setView] = useState(false);  // 메뉴의 초기값을 false로 설정
  
  const toggleView = () => {
        setView(isOpen => !isOpen); // on,off 개념 boolean
    }

  return (
    <div className="wiki-contents" >
      <li onClick={toggleView}>{parseInt(index)+1}. {title}<button onClick={linkToWikiEdit} className='wikiedit-btn'>편집</button></li>
      <hr></hr>
      <div className={isOpen ? "": "hidden"} >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}
{/* <Link to="/wiki_edit"><button>편집</button></Link> */}

export default WikiBox