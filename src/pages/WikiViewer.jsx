import Header from '../components/Header';
import { Link } from "react-router-dom/dist";
import React, {useRef, useEffect, useState} from 'react';
import WikiBox from '../components/Wiki/WikiBox';
import axios from 'axios';




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

    function handleClick(index) {
        myDivRef.current[index].scrollIntoView({ behavior: "smooth" });
        
    }

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [wiki, setWiki] = useState(null);
    const [html, setHtml] = useState(null);


    useEffect(() => {
        const getWiki = async () => {
            try{
                const result = await axios.get('http://49.50.167.168:3000/wiki/contents/5');
                console.log(result.data);
                setTitle(result.data['title']);
                setContent(result.data['content']);
                //setHtml(WikiToHtml(result.data['title']+'\n'+result.data['content']));
                //setHtml(WikiToHtml());
            } catch (error) {
                console.error(error);
            }
        };

        getWiki();
        
    }, []);
    

    
    return (
        <div className='container'>
            <div className="mobile-view">
                <div className="header">
                    <Header />
                </div>
                <div className='wiki-viewer'>
                    <h1>입실렌티</h1> 
                    <div className='wiki-index'>
                        <ol>
                            {data.map((item) => {
                                return(
                                <li onClick={() => handleClick(parseInt(data.index))}>{title}</li>
                                );
                            })}
                        </ol>
                    </div>
                    <div className='wiki-content'>
                        {data.map((item) => {
                            return(
                                <div ref={(el) => (myDivRef.current[parseInt(data.index)] = el)}>
                                    <WikiBox 
                                    header={title} content={content} idx={data.index}
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