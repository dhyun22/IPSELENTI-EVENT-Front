import Header from '../components/Header';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// convertToRaw: editorState 객체가 주어지면 원시 JS 구조로 변환.
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
// convertToRaw로 변환시켜준 원시 JS 구조를 HTML로 변환.
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import { useLocation } from 'react-router-dom/dist';


const editorStyle = {
    cursor: "pointer",
	width: "90%",
	minHeight: "20.5rem",
    marginLeft: "5%",
	border: "2px solid rgba(209, 213, 219, 0.3)",
};



function WikiShowVer() {
    
    const location = useLocation();
    const thisver = location.state;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [thishis, setthishis] = useState('');
    const [version, setVersion] = useState('');

    const [loggedIn, setLoggedIn] = useState(false);
    const Navigate = useNavigate();

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_HOST+"/user/auth/issignedin",
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


    useEffect (() => {
        checkLoginStatus();
    }, []);

    const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
        setEditorState(editorState);
    };

    const toolbarOptions = {
        options: ['inline'],
        inline: {
          options: ['bold', 'italic', 'strikethrough',],
        },
      };


    //const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    //const wikiMarkup = traverseHtml(editorToHtml);
    const getHistory = async () => {
        try{
            const result = await axios.get(process.env.REACT_APP_HOST+`/wiki/historys/${thisver}`,{
                withCredentials: true,
            }); //전체 텍스트를 가져옴.

            if(result.status === 200){
                setthishis(result.data['text']);
                setVersion(result.data.version);
            } else if(result.status === 401){
                alert(result.data.message);
                Navigate('/login');
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        
        getHistory();
        
    }, []);
    
    
    useEffect(() => {

        if (thishis) {
          const contentState = ContentState.createFromText(thishis);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        }
      }, [thishis]);
    
    const postRealRollback = async() => {
        try{
            const result = await axios.post(process.env.REACT_APP_HOST+`/wiki/historys/${thisver}`, {
                withCredentials: true,
            }); //전체 텍스트를 가져옴.
            if(result.status === 200){
                alert(result.data.message);
                Navigate('/wiki');
            } else if(result.status === 401){
                alert(result.data.message);
                Navigate('/login');
            } else if(result.status === 432){
                alert(result.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="container">
            <div className="mobile-view">
                <div className="header">
                    <Header />
                </div>
                <div className="wikiedit">
                    <h3>미리보기: {thisver}</h3>
                    <div style={editorStyle}>
                        <Editor
                            // 에디터와 툴바 모두에 적용되는 클래스
                            wrapperClassName="wrapper-class"
                            // 에디터 주변에 적용된 클래스
                            editorClassName="editor"
                            // 툴바 주위에 적용된 클래스
                            toolbarClassName="toolbar-class"
                            // 툴바 설정
                            toolbar={toolbarOptions} 
                            placeholder="내용을 작성해주세요."
                            // 한국어 설정
                            localization={{
                              locale: 'ko',
                            }}
                            // 초기값 설정
                            editorState={editorState}
                            // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                            onEditorStateChange={onEditorStateChange}
                        />
                    </div>
                    <div className='wikiedit-submit'>
                        <span>정말 롤백 하시겠습니까?</span>
                        <button classname="rollbacksubmit-btn" onClick={postRealRollback}>rollback</button>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default WikiShowVer;