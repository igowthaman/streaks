import React from 'react';
import logo from '../assets/logo.svg';

const TopBar: React.FC = () => {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  return (
    <div className="p-[16px]">
      <div className="flex items-center justify-start text-primaryWhite font-extrabold text-xl">
        <img src={logo} alt="Streaks logo" className="inline-block mr-2" />
        Streaks
      </div>
      <div className='text-secondaryWhite text-sm pt-[4px] font-semibold'>{date}</div>
    </div>
  );
};

export default TopBar;
