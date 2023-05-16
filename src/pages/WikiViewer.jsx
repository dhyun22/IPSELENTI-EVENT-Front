import Header from '../components/Header';
import { Link } from "react-router-dom/dist";
import React, {useRef, useEffect, useState} from 'react';
import WikiBox from '../components/Wiki/WikiBox';
import axios from 'axios';
import WikiToHtml from "../components/Wiki/WikiToHtml";
import { useNavigate } from 'react-router-dom/dist';





function WikiViewer(props) {
    const myDivRef = useRef([]);
    const [allText, setAllText] = useState([]);
    const Navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/user/auth/issignedin",
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setLoggedIn(true);
            } else{
                setLoggedIn(false);
	            Navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }

    }
    
    

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
        } catch (error) {
            console.error(error);
        }
    };

    const pointRequest = async () => {
        try{
            const response = await axios.get('http://localhost:8080/user/point/wikiaccess',{
                withCredentials: true
            });

            if( response.status === 201){
                alert("포인트 지급이 완료되었습니다.")
            }
            
        }catch(err){
            console.error(err)
        }
    }   

    useEffect(() => {
        checkLoginStatus();
        getWiki();
        pointRequest();

        
    }, []);
    // }, []);
    

    const linkToAllEdit = () =>{
        Navigate('/wikiedit');
    };
    // const linkToWikiHistory = () => {

    // }
    return (
        <div className='container'>
            <div className="mobile-view">
                <div className="header">
                    <Header />
                </div>
                <div className='wiki-viewer'>
                    <div className='wiki-title'>
                        <h1>입실렌티</h1>
                        <div>
                            <Link to="/wikihistory"><span id='history-link'>History</span></Link>
                            <button onClick={linkToAllEdit} className='wikiedit-btn'>편집</button>
                        </div>
                        
                    </div>
                    <div className='wiki-index'>
                        {allText.map((item) => {
                            return(
                            <li onClick={() => handleClick(parseInt(item.index))} key={item.index}>{parseInt(item.index)}. {item.title}</li>
                            );
                        })}    
                    </div>
                    <div className='wiki-content'>
                        {allText.map((item) => {
                            return(
                                <div ref={(el) => (myDivRef.current[parseInt(item.index)] = el)} key={item.index}>
                                    <WikiBox 
                                    title={item.title} content={item.content} index={item.index}
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