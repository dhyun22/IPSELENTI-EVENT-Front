import Header from '../components/Header';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// convertToRaw: editorState 객체가 주어지면 원시 JS 구조로 변환.
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
// convertToRaw로 변환시켜준 원시 JS 구조를 HTML로 변환.
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import axios from 'axios';
import traverseHtml from '../components/Wiki/HtmlToWiki';
import WikiToHtml from "../components/Wiki/WikiToHtml";


const editorStyle = {
    cursor: "pointer",
	width: "90%",
	minHeight: "20.5rem",
    marginLeft: "5%",
	border: "2px solid rgba(209, 213, 219, 0.3)",
};



function WikiEdit() {
    const [loggedIn, setLoggedIn] = useState(false);
    const Navigate = useNavigate();

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [wiki, setWiki] = useState('');
    const [version, setVersion] = useState(null);

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


    useEffect (() => {
        checkLoginStatus();
    }, []);

    const pointRequest = async () => {
        try{
            const response = await axios.get('http://localhost:8080/user/point/wikiedit',{
                withCredentials: true
            });

            if( response.status === 201){
                alert("포인트 지급이 완료되었습니다.")
            }
            
        }catch(err){
            console.error(err)
        }
    }   

    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    // const parser = new DOMParser();
    // const parsedHtml = parser.parseFromString(editorToHtml, 'text/html');
      
    const wikiMarkup = traverseHtml(editorToHtml);
    
    const navigate = useNavigate();

    const getWiki = async () => {
        try{
            const result = await axios.get('http://localhost:8080/wiki/contents/'); //전체 텍스트를 가져옴.
            setWiki(result.data['text']);
            setVersion(result.data.version);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        
        getWiki();
        
    }, []);

    const addWikiEdit = async (editContent) => {
        try {
            const result = await axios.post('http://localhost:8080/wiki/contents/', {
                version: version,
                newContent: editContent,
            });
            if (result.status === 200){
                pointRequest();
                navigate('/wikiedit/completed');
            }
        } catch(error){console.log(error)};
        
    };

    //const [content, setContent] = useState(null);
    
    useEffect(() => {

        if (wiki) {
          const contentState = ContentState.createFromText(wiki);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        }
      }, [wiki]);
    
    
    return (
        <div className="container">
            <div className="mobile-view">
                <div className="header">
                    <Header />
                </div>
                <div className="wikiedit">
                    <h3>Wiki를 편집해주세요</h3>
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
                        <button classname="editsubmit-btn" onClick={() => addWikiEdit(wikiMarkup)}>submit</button>
                    </div>

                </div>
            </div>
        </div>

    );
}


export default WikiEdit;