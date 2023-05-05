import Header from '../components/Header';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// convertToRaw: editorState 객체가 주어지면 원시 JS 구조로 변환.
import { EditorState, convertToRaw } from 'draft-js';
// convertToRaw로 변환시켜준 원시 JS 구조를 HTML로 변환.
import draftToHtml from 'draftjs-to-html';


const editorStyle = {
    cursor: "pointer",
	width: "100%",
	minHeight: "20rem",
	border: "2px solid rgba(209, 213, 219, 0.3)",
};



function WikiEdit() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

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


    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(editorToHtml, 'text/html');

    function traverseHtml(node) {
        switch (node.nodeType) {
          case Node.ELEMENT_NODE:
            const tagName = node.tagName.toLowerCase();
            switch (tagName) {
              case 'p':
                return `\\n${traverseChildren(node)}\\n`;
              case 'strong':
                return `'''${traverseChildren(node)}'''`;
              case 'em':
                return `''${traverseChildren(node)}''`;
              case 'del':
                return `--${traverseChildren(node)}--`;              // ... other HTML tags
              default:
                return traverseChildren(node);
            }
          case Node.TEXT_NODE:
            return node.textContent.trim();
          // ... other node types
          default:
            return '';
        }
      }
      
      function traverseChildren(node) {
        let result = '';
        for (let childNode of node.childNodes) {
          result += traverseHtml(childNode);
        }
        return result;
      }
      
    const wikiMarkup = traverseHtml(parsedHtml.body);
    console.log(wikiMarkup);
    
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
                    <button>submit</button>
                    <div
                        // dangerouslySetInnerHTML={{__html: editorToHtml}}
                        
                    ></div>

                </div>
            </div>
        </div>

    );
}


export default WikiEdit;