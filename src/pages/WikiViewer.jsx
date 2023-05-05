import Header from '../components/Header';
import React, {useRef} from 'react';
import { Link } from "react-router-dom/dist";



function WikiViewer() {
    const myDivRef = useRef([]);

    function handleClick(index) {
        myDivRef.current[index].scrollIntoView({ behavior: "smooth" });
    }
    
    return (
        <div className='container'>
            <div className="mobile-view">
                <div className="header">
                    <Header />
                </div>
                <div className='wiki-viewer'>
                    
                    <div>
                        <h1>입실렌티</h1>
                        <div className='wiki-index'>
                            <ul onClick={() => handleClick(0)}>1. 일번항목</ul>
                            <ul onClick={() => handleClick(1)}>2. 이번항목</ul>
                            <ul onClick={() => handleClick(2)}>3. 삼번항목</ul>
                            <ul onClick={() => handleClick(3)}>4. 사번항목</ul>
                        </div>
                        <div className="wiki-contents content-one" ref={(el) => (myDivRef.current[0] = el)}>
                            <details>
                                <summary>1. 일번항목 <Link to="/wiki_edit">편집</Link><hr></hr></summary>
                                <div className="contents-content" >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Nostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! 
                                    Similique aperiam eaque aliquam ratione earum, unde sunt!
                                </div>
                            </details>
                        </div>
                        <div className="wiki-contents content-three" ref={(el) => (myDivRef.current[1] = el)}>
                            <details>
                                <summary>2. 이번항목 <Link to="/wiki_edit">편집</Link><hr></hr></summary>
                                <div className="contents-content">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Nostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! 
                                    Similique aperiam eaque aliquam ratione earum, unde sunt!
                                </div>
                            </details>
                        </div>
                        <div className="wiki-contents content-three" ref={(el) => (myDivRef.current[2] = el)}>
                            <details>
                                <summary>3. 삼번항목 <Link to="/wiki_edit">편집</Link><hr></hr></summary>
                                <div className="contents-content">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Nostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! 
                                    Similique aperiam eaque aliquam ratione earum, unde sunt!
                                </div>
                            </details>
                        </div>
                        <div className="wiki-contents content-three" ref={(el) => (myDivRef.current[3] = el)}>
                            <details>
                                <summary>4. 사번항목 <Link to="/wiki_edit">편집</Link><hr></hr></summary>
                                <div className="contents-content">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Nostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! 
                                    Similique aperiam eaque aliquam ratione earum, unde sunt!
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

    )
}

export default WikiViewer;