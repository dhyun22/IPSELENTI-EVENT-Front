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
import WikiEditContent from './pages/WikiEditContent';
import WikiHistory from './pages/WikiHistory';
import WikiShowVer from './pages/WikiShowVer';


function App() {
    
//     // const [allContent, setAllContent] = useState(null);
//     const [loggedIn, setLoggedIn] = useState(false);

//    // const Navigate = useNavigate();
//     // const [index, setIndex] = useState(null);
//     // const [wiki, setWiki] = useState(null);
//     // const [html, setHtml] = useState(null);
//     const checkLoginStatus = async () => {
//         try {
//             const response = await axios.get(
//                 "http://localhost:8080/user/auth/issignedin",
//                 {
//                     withCredentials: true,
//                 }
//             );

//             if (response.data.success) {
//                 setLoggedIn(true);
//             } else{
//                 setLoggedIn(false);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

    

    
    

        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/wiki" element={<WikiViewer />} />

                    <Route path="/wikiedit" element={<WikiEdit />} />
                    <Route path="/wikiedit/:id" element={<WikiEditContent />} />
                    <Route path="/wikihistory" element={<WikiHistory />} />
                    <Route path="/wikihistory/:version" element={<WikiShowVer />} />

                    <Route path="/wikiedit/completed" element={<WikiEditCompleted />} />
                    <Route path="/addindex/completed" element={<WikiEditCompleted />} />
                    <Route path="/signup/completed" element={<SignUpCompleted />} />

                    <Route path="/lineupevent" element={<LineupEvent />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/mypage" element={<MyPage />} />
                    {/* <Route path="/admin1905051312348998&" element={<Admin />} /> */}
                    <Route path="/comment" element={<CommentPage/>}/>

                </Routes>
            </Router>
        )
    }


export default App;