import React from 'react'

const WikiToHtml = (wikiText) => {
        let html = wikiText;
        
        html = html.replace(/===([^=].*?)===/g, '<h3>$1</h3>');
        // 제목 처리
        html = html.replace(/==([^=].*?)==/g, '<h2>$1</h2>');

        html = html.replace(/'''([^=].*?)'''/g, '<strong>$1</strong>');
        
        // 강조 처리
        html = html.replace(/''(.+?)''/g, '<em>$1</em>');
        
        // 링크 처리
        html = html.replace(/--(.+?)--/g, '<del>$1</del>');
      
        return html;
};


export default WikiToHtml