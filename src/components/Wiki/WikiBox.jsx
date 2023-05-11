import React from 'react';
import { Link } from "react-router-dom/dist";
import WikiToHtml from './WikiToHtml';
import { useNavigate } from 'react-router-dom/dist';

function WikiBox (props) {

  //const title = WikiToHtml(props.title);
  const title = props.title;
  const content = WikiToHtml(props.content);
  const index = props.idx;
  const Navigate = useNavigate();

  const linkToWikiEdit = () => {
    if(index === 0 ){
      Navigate('/wikiedit');
    } else{
      Navigate('/wikiedit/content/');
    }
  };

  return (
    <div className="wiki-contents content-one" >
        <details>
            <summary>{title}<button onClick={linkToWikiEdit}>편집</button><hr></hr></summary>
                <div className="contents-content" >
                  <div dangerouslySetInnerHTML={{ __html: content }} />;
                </div>
        </details>
    </div>
  )
}
{/* <Link to="/wiki_edit"><button>편집</button></Link> */}

export default WikiBox