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
import Admin from './pages/Admin';
import { useEffect } from 'react';


function App() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/wiki" element={<WikiViewer />} />
                    <Route path="/wiki_edit" element={<WikiEdit />} />
                    <Route path="/wiki_edit_completed" element={<WikiEditCompleted />} />
                    <Route path="/addindex_completed" element={<WikiEditCompleted/>} />
                    <Route path="/signup_completed" element={<SignUpCompleted />} />
                    <Route path="/lineup_event" element={<LineupEvent />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/admin1905051312348998&" element={<Admin />} />
                    <Route path="/comment" element={<CommentPage/>}/>
                </Routes>
            </Router>
        )
    }


export default App;