import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import AddIndex from "./pages/AddIndex";
import CommentPage from "./pages/CommentPage";
import LineupEvent from "./pages/LineupEvent";
import MyPage from "./pages/MyPage";
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import SignUpCompleted from "./pages/SignUpCompleted";
import WikiEdit from "./pages/WikiEdit";
import WikiEditCompleted from "./pages/WikiEditCompleted";
import WikiViewer from "./pages/WikiViewer";
import WikiToHtml from "./components/Wiki/WikiToHtml";
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom/dist";


function App() {
    const [allText, setAllText] = useState('');
    const [allContent, setAllContent] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

   // const Navigate = useNavigate();
    // const [index, setIndex] = useState(null);
    // const [wiki, setWiki] = useState(null);
    // const [html, setHtml] = useState(null);
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
            }
        } catch (error) {
            console.error(error);
        }
    };

    

    
    useEffect(() => {
        const getWiki = async () => {
            try{
                const result = await axios.get('http://localhost:8080/wiki/contents/');
                setAllText(result.data['text']);
                setAllContent(result.data['content']);

                //console.log(result.data);
                // setContent(result.data);
                // setIndex(result.data[''])
                // setWiki(result.data['title']+'\n'+result.data['content']['']);
                //setHtml(WikiToHtml());
            } catch (error) {
                console.error(error);
            }
        };

        getWiki();
        
    }, []);

        return (
            <Router>
                <Routes>
                    <Route path="/main" element={<Home checkLoginStatus={checkLoginStatus} loggedIn={loggedIn}/>} />
                    <Route path="/입실렌티" element={<WikiViewer checkLoginStatus={checkLoginStatus} loggedIn={loggedIn} allContent={allContent} />} />
                    <Route path="/wiki_edit" element={<WikiEdit  checkLoginStatus={checkLoginStatus} loggedIn={loggedIn} allText={allText} allContent={allContent}/>} />
                    <Route path="/wiki_edit_completed" element={<WikiEditCompleted checkLoginStatus={checkLoginStatus} loggedIn={loggedIn} />} />
                    <Route path="/addindex_completed" element={<WikiEditCompleted checkLoginStatus={checkLoginStatus} loggedIn={loggedIn}/>} />
                    <Route path="/signup_completed" element={<SignUpCompleted checkLoginStatus={checkLoginStatus} loggedIn={loggedIn}/>} />
                    <Route path="/lineup_event" element={<LineupEvent checkLoginStatus={checkLoginStatus} loggedIn={loggedIn}/>} />
                    <Route path="/signup" element={<SignUp checkLoginStatus={checkLoginStatus} loggedIn={loggedIn}/>} />
                    <Route path="/login" element={<Login checkLoginStatus={checkLoginStatus} loggedIn={loggedIn}/>} />

                </Routes>
            </Router>
        )
    }


export default App;
