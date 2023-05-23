import React from 'react';
import { useState, useEffect } from 'react';
import {AiOutlineArrowUp} from 'react-icons/ai'

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={handleScrollToTop}>
          <AiOutlineArrowUp/>
        </button>
      )}
    </div>
  );
}

export default ScrollToTopButton;