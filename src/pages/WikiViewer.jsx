import Header from '../components/Header';
import { Link } from "react-router-dom/dist";
import React, {useRef, useEffect, useState} from 'react';
import WikiBox from '../components/Wiki/WikiBox';
import axios from 'axios';
import WikiToHtml from "../components/Wiki/WikiToHtml";
import { useNavigate } from 'react-router-dom/dist';




const data = [
    {
        'index' : '0',
        'header': '일번항목',
        'content': "Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddddddddddddddddddddddddddNostrum, optio, assumenda distinctio autem, nimi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt! " 
    },
    {
        'index' : '1',
        'header': '이번항목',
        'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddddddddddddddddddddddddddddddddddostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
    },
    {
        'index' : '2',
        'header': '삼번항목',
        'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elitddddddddddddddddddddddddddddd. ostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
    },
    {
        'index': '3',
        'header': '사번항목',
        'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ostrum, odfkjs;fjskdjf;alskdjf;sdlkfj;alsdkjf;alskdjf;laksdjf;laskdjfaffffffffffffffffffffffffffptio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
    },
]





function WikiViewer(props) {
    const myDivRef = useRef([]);
    const [allText, setAllText] = useState([]);
    const Navigate = useNavigate();
    

    function handleClick(index) {
        myDivRef.current[index].scrollIntoView({ behavior: "smooth" });
        
    }

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [wiki, setWiki] = useState(null);
    const [html, setHtml] = useState(null);


    const getWiki = async () => {
        try{
            const result = await axios.get('http://localhost:8080/wiki/contents'); //{index} 가져올 방법 생각
            setAllText(result.data.contents);
            // setAllText(result.data['text']);
            // setAllContent(result.data['content']);

            //console.log(result.data);
            // setContent(result.data);
            // setIndex(result.data[''])
            // 
            //setHtml(WikiToHtml());
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     console.log("hi");

    //     getWiki();
        
    // }, []);
    // // }, []);
    

    const linkToAllEdit = () =>{
        Navigate('/wikiedit');
    }
    return (
        <div className='container'>
            <div className="mobile-view">
                <div className="header">
                    <Header />
                </div>
                <div className='wiki-viewer'>
                    <div className='wiki-title'>
                        <h1>입실렌티</h1>
                        <button onClick={linkToAllEdit} className='wikiedit-btn'>편집</button>
                    </div>
                    <div className='wiki-index'>
                        {data.map((item) => {
                            return(
                            <li onClick={() => handleClick(parseInt(item.index))} key={item.index}>{parseInt(item.index)+1}. {item.header}</li>
                            );
                        })}    
                    </div>
                    <div className='wiki-content'>
                        {data.map((item) => {
                            return(
                                <div ref={(el) => (myDivRef.current[parseInt(item.index)] = el)} key={item.index}>
                                    <WikiBox 
                                    title={item.header} content={item.content} index={item.index}
                                    />
                                </div>
                            );
                        })}
                    </div>    
                </div>
            </div>
        </div>
        

    );
}

export default WikiViewer;