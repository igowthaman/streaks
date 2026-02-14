import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="text-white text-2xl font-bold p-[16px]">
      <div className="flex items-center justify-between gap-[16px] mb-xl">
        <div className="border-solid border-2 border-borderBlue border rounded-3xl p-[16px] bg-cardBlue w-[40%]">
          <div className="text-md mb-[8px] flex items-center gap-[4px] text-secondaryWhite">
            <div className="i-material-symbols:incomplete-circle text-primaryBlue " />
            <div className="text-[16px]">SCORE</div>
          </div>
          <div className="text-3xl">
            <span className="text-white font-extrabold mr-2">10</span>
            <span className="text-primaryGreen text-sm">50%</span>
          </div>
        </div>
        <div className="border-solid border-2 border-borderBlue border rounded-3xl p-[16px] bg-cardBlue w-[40%]">
          <div className="text-md mb-[8px] flex items-center gap-[4px] text-secondaryWhite">
            <div className="i-material-symbols:local-fire-department-rounded text-primaryOrange" />
            <div className="text-[16px]">STREAK</div>
          </div>
          <div className="text-3xl">
            <span className="text-primaryBlue font-extrabold mr-2">10</span>
            <span className="text-secondaryWhite text-sm">Days</span>
          </div>
        </div>
      </div>
      <div className="">
        <div>
          <div className="text-xl font-bold mb-[16px]">Today's Tasks</div>
          <div className='flex flex-col gap-[12px]'>
            <div className="border-solid border-2 border-borderBlue border rounded-3xl p-[16px] bg-cardBlue flex items-center gap-[12px] cursor-pointer">
            <div className="i-material-symbols:check-circle-rounded text-primaryGreen text-3xl" />
            <div className="text-lg">
              <div className="text-secondaryWhite line-through">
                Morning Run
              </div>
              <div className="text-sm text-primaryBlue">+20 Points</div>
            </div>
          </div>
          <div className="border-solid border-2 border-borderBlue border rounded-3xl p-[16px] bg-cardBlue flex items-center gap-[12px] cursor-pointer">
            <div className="i-material-symbols:circle-outline text-borderBlue text-3xl" />
            <div className="text-lg">
              <div className="text-white">
                Morning Run
              </div>
              <div className="text-sm text-primaryBlue">+20 Points</div>
            </div>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
