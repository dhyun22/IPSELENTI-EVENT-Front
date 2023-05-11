import React from 'react';
import { Link } from "react-router-dom/dist";
import WikiToHtml from './WikiToHtml';

function WikiBox (props) {

  //const title = WikiToHtml(props.title);
  const title = props.title;
  const content = WikiToHtml(props.content);
  const index = props.idx;

  return (
    <div className="wiki-contents content-one" >
        <details>
            <summary>{title}<Link to="/wiki_edit">편집</Link><hr></hr></summary>
                <div className="contents-content" >
                  <div dangerouslySetInnerHTML={{ __html: content }} />;
                </div>
        </details>
    </div>
  )
}
{/* <Link to="/wiki_edit"><button>편집</button></Link> */}

export default WikiBox