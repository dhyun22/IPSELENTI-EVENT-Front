import React from 'react';
import { useState } from 'react';

function BettingButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    backgroundColor: isHovered ? 'darkred' : 'crimson',
    color: '#FFFFFF',
    borderRadius: '4px',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
    border: 'none',
    padding: '7px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  };

  return (
    <button className='betting_btn' style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      베팅
    </button>
  );
}

export default BettingButton;
