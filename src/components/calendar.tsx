import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import moment from 'moment';
import type { Moment } from 'moment';
import classNames from 'classnames';

interface CalendarProps {
  selectedDate: Moment;
  onSelectDate: (date: Moment) => void;
  onClose: () => void;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  onClose,
}) => {
  const [viewMonth, setViewMonth] = useState(
    selectedDate.clone().startOf('month'),
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const startDay = viewMonth.clone().startOf('week');
  const endDay = viewMonth.clone().endOf('month').endOf('week');

  const weeks: Moment[][] = [];
  const cursor = startDay.clone();
  while (cursor.isSameOrBefore(endDay, 'day')) {
    const week: Moment[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(cursor.clone());
      cursor.add(1, 'day');
    }
    weeks.push(week);
  }

  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        ref={ref}
        className="border border-0 rounded-2xl bg-navBlue p-6 w-[calc(100vw-32px)] max-w-[400px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            className="text-secondaryWhite bg-cardBlue text-lg p-2 rounded-lg hover:bg-hoverBlue border border-0"
            onClick={() => setViewMonth(viewMonth.clone().subtract(1, 'month'))}
          >
            <div className="i-material-symbols:chevron-left-rounded w-6 h-6"></div>
          </button>
          <div className="text-primaryWhite font-bold text-base">
            {viewMonth.format('MMMM YYYY')}
          </div>
          <button
            className="text-secondaryWhite bg-cardBlue text-lg p-2 rounded-lg hover:bg-hoverBlue border border-0"
            onClick={() => setViewMonth(viewMonth.clone().add(1, 'month'))}
          >
            <div className="i-material-symbols:chevron-right-rounded w-6 h-6"></div>
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayLabels.map((label) => (
            <div
              key={label}
              className="text-center text-sm text-secondaryWhite font-bold py-1"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {weeks.flat().map((day) => {
            const isCurrentMonth = day.isSame(viewMonth, 'month');
            const isSelected = day.isSame(selectedDate, 'day');
            const isToday = day.isSame(moment(), 'day');

            return (
              <button
                key={day.format('YYYY-MM-DD')}
                className={classNames(
                  'w-full aspect-square rounded-full text-sm font-bold flex items-center justify-center transition-colors border border-0 bg-cardBlue',
                  {
                    'bg-primaryBlue text-white': isSelected,
                    'border border-solid border-primaryBlue text-primaryBlue': isToday,
                    'text-primaryWhite hover:bg-hoverBlue': isCurrentMonth && !isSelected && !isToday,
                    'text-secondaryWhite opacity-40': !isCurrentMonth,
                  },
                )}
                onClick={() => {
                  onSelectDate(day.clone());
                  onClose();
                }}
              >
                {day.date()}
              </button>
            );
          })}
        </div>

        {/* Today shortcut */}
        <button
          className="mt-4 w-full py-3 rounded-full bg-primaryBlue10 text-primaryBlue text-sm font-bold hover:bg-primaryBlue hover:text-white transition-colors border border-0"
          onClick={() => {
            onSelectDate(moment());
            onClose();
          }}
        >
          Today
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default Calendar;
