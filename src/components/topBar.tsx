import React from 'react';
import logo from '../assets/logo.svg';

const TopBar: React.FC = () => {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  return (
    <div className="flex justify-between items-center min-w-[calc(100vw-32px)] p-[16px]">
      <div>
        <div className="flex items-center justify-start text-primaryWhite font-extrabold text-2xl">
          <img src={logo} alt="Streaks logo" className="inline-block mr-2" />
          Streaks
        </div>
        <div className="text-secondaryWhite text-base pt-[4px] font-semibold ml-[36px]">
          {date}
        </div>
      </div>
      <div className="flex items-center justify-between border-solid border-2 border-borderBlue border rounded-full px-[16px] py-[8px] bg-cardBlue text-2xl">
        <div className="text-primaryOrange font-extrabold">10</div>
        <div className="i-material-symbols:local-fire-department-rounded text-primaryOrange text-3xl" />
      </div>
    </div>
  );
};

export default TopBar;
