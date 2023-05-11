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



function App() {
    const [allText, setAllText] = useState('');
    const [allContent, setAllContent] = useState(null);
    const [index, setIndex] = useState(null);
    const [wiki, setWiki] = useState(null);
    const [html, setHtml] = useState(null);

    useEffect(() => {
        const getWiki = async () => {
            try{
                const result = await axios.get('http://49.50.167.168:3000/wiki/contents/');
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
                    <Route path="/" element={<Home />} />
                    <Route path="/입실렌티" element={<WikiViewer allContent={allContent} />} />
                    <Route path="/wiki_edit" element={<WikiEdit  allText={allText} allContent={allContent}/>} />
                    <Route path="/wiki_edit_completed" element={<WikiEditCompleted />} />
                    <Route path="/addindex_completed" element={<WikiEditCompleted/>} />
                    <Route path="/signup_completed" element={<SignUpCompleted />} />
                    <Route path="/lineup_event" element={<LineupEvent />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                </Routes>
            </Router>
        )
    }


export default App;
