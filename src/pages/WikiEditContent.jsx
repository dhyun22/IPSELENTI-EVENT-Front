import Header from '../components/Header';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom/dist';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// convertToRaw: editorState 객체가 주어지면 원시 JS 구조로 변환.
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
// convertToRaw로 변환시켜준 원시 JS 구조를 HTML로 변환.
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import HtmlToWiki from '../components/Wiki/HtmlToWiki';


const editorStyle = {
    cursor: "pointer",
	width: "90%",
	minHeight: "22rem",
	border: "2px solid rgba(209, 213, 219, 0.3)",
    fontSize: "14.6px",
    padding: "0px 5px 0px 5px",
};



function WikiEditContent() {
    const location = useLocation();
    const section = location.state;
    const [loggedIn, setLoggedIn] = useState(true);
    const navRef = useRef(useNavigate());
    const Navigate = useNavigate();

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [wiki, setWiki] = useState('');
    const [version, setVersion] = useState('');
    const [copy, setCopy] = useState(false);

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


      const pointRequest = async () => {
        try{
            const response = await axios.get(process.env.REACT_APP_HOST+'/user/point/wikiedit',{
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
                    getWiki(); //로그인 성공시에만 불러옴
                } else{
                    setLoggedIn(false);
                    Navigate('/login')
                }
            } catch (error) {
                console.error(error);
            }
    
        }

        const getWiki = async () => {
            try{

                // await checkLoginStatus();

                const result = await axios.get(process.env.REACT_APP_HOST+`/wiki/contents/${section}`, {
                    withCredentials: true,
                }); 
                if (result.status === 200){
                    setWiki(result.data['title']+'\n'+result.data['content']);
                    setVersion(result.data.version);
                }
                
            } catch (error) {
                console.error(error);
                if(error.response.status === 401){
                    alert("login이 필요합니다.");
                    Navigate('/login');
                }
                //alert("result.data.message");
            }
        };

        checkLoginStatus();
        setCopy(false);
        
    }, []);

    useEffect(() => {
        if (loggedIn === false) {
          Navigate("/login");
        }
      }, [loggedIn]);


    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent())); //편집기에 담긴 내용을 html로 바꿈 

    // const parser = new DOMParser();
    // const parsedHtml = parser.parseFromString(editorToHtml, 'text/html');
    const wikiMarkup = HtmlToWiki(editorToHtml);
    
    

    const addWikiEdit = async (editContent) => {
        try {
            const result = await axios.post(process.env.REACT_APP_HOST+`/wiki/contents/${section}`, {
                version: version,
                newContent: editContent,
            },{
                withCredentials: true,
            });
            if (result.status === 200){
                Navigate('/wikiedit/completed');
            } else if(result.status === 210){
                alert("수정에 기여해주셔서 감사합니다.");
                Navigate('/wiki');
            }
        } catch(error){
            if(error.response.status === 401){
                alert("login이 필요합니다.");
                Navigate('/login');
            } else if(error.response.status === 432){
                alert("제출해 실패했습니다. 다시 시도해주세요.");
                // setWiki(error.response.data.newContent);
            }else if(error.response.status === 426){
                alert("기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.");
                setCopy(true);
            }
        }
        
    };
    
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
                <div className="headerContainer">
                    <Header />
                </div>
                <div className="wikiedit">
                    <h2>Wiki를 편집해주세요</h2>
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
                        <button onClick={() => addWikiEdit(wikiMarkup)}>submit</button>
                        <p className={copy ? '': 'hidden'}>기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.<br></br>수정한 내용은 메모장에 복사해둔 후 새로고침 후 저장해주세요</p>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default WikiEditContent;