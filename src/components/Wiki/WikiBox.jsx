import React from 'react';
import WikiToHtml from './WikiToHtml';
import { useNavigate } from 'react-router-dom/dist'
import { useParams } from 'react-router-dom/dist';
import { useState } from 'react';

function WikiBox (props) {

  //const title = WikiToHtml(props.title);
  const title = props.title;
  const content = WikiToHtml(props.content);
  const section = props.section;
  const Navigator = useNavigate();
  const { id } = useParams();


  const linkToWikiEdit = () => {
      Navigator(`/wikiedit/${section}`, {state: section});
  
  }

  const [isOpen, setView] = useState(true);  // 메뉴의 초기값을 false로 설정
  
  const toggleView = () => {
        setView(isOpen => !isOpen); // on,off 개념 boolean
    }

  return (
    <div className="wiki-contents" >
      <li onClick={toggleView}>{section} {title}<button onClick={linkToWikiEdit} className='wikiedit-btn'>편집</button></li>
      <hr></hr>
      <div className={isOpen ? "": "hidden"} >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}
{/* <Link to="/wiki_edit"><button>편집</button></Link> */}

export default WikiBox