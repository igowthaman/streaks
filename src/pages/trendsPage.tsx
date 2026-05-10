import React, { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';
import moment from 'moment';
import Calendar from '../components/calendar';

const data = [
  { name: 'Mon', uv: 90 },
  { name: 'Tue', uv: 40 },
  { name: 'Wed', uv: 35 },
  { name: 'Thu', uv: 50 },
  { name: 'Fri', uv: 45 },
];

const TrendsPage: React.FC = () => {
  const [date, setDate] = useState(moment());
  const [showCalendar, setShowCalendar] = useState(false);
  const getWeek = () => {
    const startOfWeek = date.clone().startOf('week').format('MMM D');
    const endOfWeek = date.clone().endOf('week').format('MMM D');
    return `${startOfWeek} - ${endOfWeek}`;
  };

  useEffect(() => {
    console.log('Date changed:', date.format('MMM D'));
  }, [date]);

  return (
    <div className="p-[16px] min-w-[calc(100vw-32px)]">
      <div className="border border-1 border-solid border-hoverBlue rounded-3xl bg-cardBlue pb-[8px]">
        <div className="m-[16px] flex justify-between">
          <div className="text-secondaryWhite">
            <div className="text-xl font-bold">Daily Average</div>
            <div className="text-sm ">{getWeek()}</div>
          </div>
          <div className="text-3xl font-bold text-primaryGreen">40 %</div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ className: 'text-secondaryWhite' }}
              padding={{ left: 30, right: 30 }}
            />
            <Line dataKey="uv" stroke="#0D59F2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="border-2 border-primaryBlue10 rounded-[50px] p-[4px] flex justify-between gap-3 mt-4">
        <div
          className="py-[8px] rounded-full text-center font-bold  text-lg bg-primaryBlue text-white px-4"
          onClick={() => setDate(date.clone().subtract(1, 'day'))}
        >
          <div className="i-material-symbols:arrow-left-alt-rounded"></div>
        </div>
        <div className="relative">
          <div
            className="py-[8px] rounded-full text-center font-bold bg-primaryBlue text-white text-sm px-4 cursor-pointer"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {date.format('MMM D')}
          </div>
        </div>
        {showCalendar && (
          <Calendar
            selectedDate={date}
            onSelectDate={setDate}
            onClose={() => setShowCalendar(false)}
          />
        )}
        <div
          className="py-[8px] rounded-full text-center font-bold text-lg bg-primaryBlue text-white px-4"
          onClick={() => setDate(date.clone().add(1, 'day'))}
        >
          <div className="i-material-symbols:arrow-right-alt-rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default TrendsPage;
