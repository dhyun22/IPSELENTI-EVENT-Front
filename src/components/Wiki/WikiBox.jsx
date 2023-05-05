import React from 'react';
import { Link } from "react-router-dom/dist";

function WikiBox (props) {
  return (
    <div className="wiki-contents content-one" >
        <details>
            <summary>{props.header}<Link to="/wiki_edit">편집</Link><hr></hr></summary>
                <div className="contents-content" >
                    {props.content}
                </div>
        </details>
    </div>
  )
}
{/* <Link to="/wiki_edit"><button>편집</button></Link> */}

export default WikiBox