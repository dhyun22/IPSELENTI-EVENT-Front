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
import traverseHtml from '../components/Wiki/HtmlToWiki';


const editorStyle = {
    cursor: "pointer",
	width: "90%",
	minHeight: "22rem",
	border: "2px solid rgba(209, 213, 219, 0.3)",
    fontSize: "14.6px",
    padding: "0px 5px 0px 5px",
};

//const example = "김현석과 박미희의 차녀로, 3살 위의 언니 김애라(간호사)가 있다. 아버지는 전직 사업가로, 훈련비를 포함한 금전적인 지원을 하며 기러기 아빠 생활을 했다. 한때 일부 안티들이 부모님이 이혼했다는 날조된 정보를 퍼뜨렸지만 이는 사실이 아니다.어머니의 저서인 <아이의 재능에 꿈의 날개를 달아라>에 따르면 큰딸 김애라도 노래에 재능이 있어서 음악 전공을 희망했으나 두 딸을 모두 지원할 여유가 없었고, 박미희 자신 또한 큰딸이 음악으로 성공할 수 있을지에 대한 확신이 없었던 탓에 설득해서 음악 전공을 포기하게 했다고 한다. 같은 책에 따르면 그 일이 있은 지 얼마 후 같이 노래방에 갔다가 진짜로 재능이 있는 것을 보고 다시 음악을 전공할 것을 설득했지만 이미 김애라는 간호학과로 진로를 결정한 뒤였다. 같은 책에서 박미희는 큰딸의 진로를 바꾸게 한 일을 후회하며 미안함을 밝혔고[83] 김연아 또한 비슷한 감정을 느꼈다고 방송에서 언급했다. 이처럼 아무래도 박미희는 작은딸 김연아에게 올인하느라 큰딸 김애라에게 소홀할 수밖에 없었기에, 큰딸이 고등학교 3학년이던 시절 1년 내내 담임 교사를 만난 적이 없었을 정도였다. 큰딸의 졸업식 때 처음이자 마지막으로 담임 교사를 한번 본 게 전부라고 한다.김연아의 가족이 군포시에서 여의도동으로 이사를 간 적이 있는데, 당시 언니 김애라가 가톨릭대학교 여의도성모병원에서 간호사로 근무를 시작한 지 얼마 안 되었을 때다. 물론, 그 외에도 김연아의 잦은 해외 출장과 연습장 이용 편의성, 방송국 출연 등을 고려한 것이다. 참고로 김애라는 2014년에 결혼한 이후 간호사를 그만두었다.2022년 7월, 한 언론사의 취재로 포레스텔라의 고우림과 열애사실이 알려졌고, 양측 소속사에서 열애사실을 인정함과 동시에 10월 결혼 소식을 발표했다. 2018년 아이스쇼에서 만난 후 3년간 연애했다고 한다. 2022년 10월 22일, 비공개로 서울 중구 신라호텔에서 결혼식을 올렸고 인스타그램에 웨딩화보 및 결혼식 사진들을 올렸다. 1 2 3 4 5 이 날 결혼식에는 이상화, 윤성빈, 최민정, 김해진, 박소연, 최다빈, 임은수, 김예림, 신지아 등 여러 전현직 빙상계 선수들이 참석했고, 비슷한 시기에 2022 스케이트 아메리카가 있어서 몇몇 선수들은 참석하지 못했다. 김연아의 키스 앤 크라이 인연으로 사회는 신동엽이 맡았으며, 정수정이 하객으로 참석했다. # 그 외에도 수년간 김연아의 안무를 맡아준 데이비드 윌슨은 꽃다발을 보내기도 했다. #"


function WikiEdit() {
    const [loggedIn, setLoggedIn] = useState(false);
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


    // 


    // useEffect (() => {
    //     const checkLoginStatus = async () => {
    //         try {
    //             const response = await axios.get(
    //                 process.env.REACT_APP_HOST+"/user/auth/issignedin",
    //                 {
    //                     withCredentials: true,
    //                 }
    //             );
    
    //             if (response.data.success) {
    //                 setLoggedIn(true);
    //             } else{
    //                 setLoggedIn(false);
    //                 Navigate('/login');
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    
    //     }
    //     checkLoginStatus();
    // }, []);

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

    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    // const parser = new DOMParser();
    // const parsedHtml = parser.parseFromString(editorToHtml, 'text/html');
      
    const wikiMarkup = traverseHtml(editorToHtml);


    useEffect(() => {

        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(
                    process.env.REACT_APP_HOST+"/user/auth/issignedin",
                    {
                        withCredentials: true,
                    }
                );
    
                if (response.status === 201) {
                    setLoggedIn(true);
                    getWiki(); //로그인 성공 시에만 불러옴
                } else if (response.status === 401){
                    setLoggedIn(false);
                    Navigate('/login');
                }
            } catch (error) {
                console.error(error);
            }
    
        }

        const getWiki = async () => {
            try{

                // await checkLoginStatus(); // 로그인 상태 확인 완료 후에 getWiki 호출

                const result = await axios.get(process.env.REACT_APP_HOST+'/wiki/contents/',{
                    withCredentials: true,
                }); //전체 텍스트를 가져옴.
                if (result.status === 200){
                    setWiki(result.data['text']);
                setVersion(result.data.version);
                } else if(result.status === 401){
                    alert(result.data.message);
                    Navigate('/login');
                }
    
            } catch (error) {
                console.error(error);
                //alert("result.data.message");
            }
        };
        
        
        checkLoginStatus();
        setCopy(false);
        
    }, []);

    const addWikiEdit = async (editContent) => {
        try {
            const result = await axios.post(process.env.REACT_APP_HOST+'/wiki/contents/', {
                version: version,
                newContent: editContent,
            },{
                withCredentials: true,
            });
            if (result.status === 200){
                Navigate('/wikiedit/completed');
            } else if(result.status === 401){
                alert(result.data.message);
                Navigate('/login');
            } else if(result.status === 210){
                alert("수정에 기여해주셔서 감사합니다.");
                Navigate('/wiki');
            }else if(result.status === 432){
                alert("제출해 실패했습니다. 다시 시도해주세요.");
                setWiki(result.data.newContent);
            }else if(result.status === 426){
                alert("기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.");
                setCopy(true);
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
                        <button className={copy ? "hidden": "editsubmit-btn"} onClick={() => addWikiEdit(wikiMarkup)}>submit</button>
                        <p className={copy ? '': 'hidden'}>기존 글이 수정되었습니다. 수정 내용 복사 후 다시 제출해주세요.</p>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default WikiEdit;