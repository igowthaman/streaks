import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-w-[calc(100vw-32px)] text-white text-2xl font-bold p-[16px]">
      <div>
        <div className="flex items-center justify-between text-2xl font-bold mb-[16px]">
          <div>Today's Tasks</div>
          <div className="text-primaryGreen">
            50
            <span className="text-[16px]"> %</span>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="border-solid border-2 border-borderBlue border rounded-3xl p-[16px] bg-cardBlue flex items-center gap-[12px]">
            <div className="i-material-symbols:check-circle-rounded text-primaryGreen text-3xl" />
            <div className="text-lg text-secondaryWhite line-through">
              Morning Run
            </div>
          </div>
          <div className="border-solid border-2 border-borderBlue border rounded-3xl p-[16px] bg-cardBlue flex items-center gap-[12px]">
            <div className="i-material-symbols:circle-outline text-borderBlue text-3xl" />
            <div className="text-lg text-white">Morning Run</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
