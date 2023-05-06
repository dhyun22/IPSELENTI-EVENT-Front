import React from 'react'

function HtmlToWiki () {

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
}

export default HtmlToWiki