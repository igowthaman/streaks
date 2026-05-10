import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import moment from 'moment';
import type { Moment } from 'moment';
import classNames from 'classnames';

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface CalendarProps {
  selectedDate: Moment;
  onSelectDate: (date: Moment) => void;
  onClose: () => void;
  minDate?: Moment;
  maxDate?: Moment;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  onClose,
  minDate,
  maxDate,
}) => {
  const [viewMonth, setViewMonth] = useState(() =>
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

  const days = useMemo(() => {
    const startDay = viewMonth.clone().startOf('week');
    const endDay = viewMonth.clone().endOf('month').endOf('week');
    const result: Moment[] = [];
    const cursor = startDay.clone();
    while (cursor.isSameOrBefore(endDay, 'day')) {
      result.push(cursor.clone());
      cursor.add(1, 'day');
    }
    return result;
  }, [viewMonth]);

  const today = useMemo(() => moment(), []);

  const canGoPrevMonth = useMemo(
    () => !minDate || viewMonth.clone().subtract(1, 'month').endOf('month').isSameOrAfter(minDate, 'day'),
    [viewMonth, minDate],
  );

  const canGoNextMonth = useMemo(
    () => !maxDate || viewMonth.clone().add(1, 'month').startOf('month').isSameOrBefore(maxDate, 'day'),
    [viewMonth, maxDate],
  );

  const isTodayDisabled = useMemo(
    () => (minDate && today.isBefore(minDate, 'day')) || (maxDate && today.isAfter(maxDate, 'day')),
    [minDate, maxDate, today],
  );

  const handlePrevMonth = useCallback(
    () => setViewMonth((prev) => prev.clone().subtract(1, 'month')),
    [],
  );

  const handleNextMonth = useCallback(
    () => setViewMonth((prev) => prev.clone().add(1, 'month')),
    [],
  );

  const handleSelectToday = useCallback(() => {
    onSelectDate(moment());
    onClose();
  }, [onSelectDate, onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        ref={ref}
        className="border border-0 rounded-2xl bg-navBlue p-6 w-[calc(100vw-32px)] max-w-[calc(90%-32px)] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            className={classNames(
              'text-secondaryWhite bg-cardBlue text-lg p-2 rounded-lg border border-0',
              canGoPrevMonth ? 'hover:bg-hoverBlue' : 'opacity-30 cursor-not-allowed',
            )}
            disabled={!canGoPrevMonth}
            onClick={handlePrevMonth}
          >
            <div className="i-material-symbols:chevron-left-rounded w-6 h-6"></div>
          </button>
          <div className="text-primaryWhite font-bold text-base">
            {viewMonth.format('MMMM YYYY')}
          </div>
          <button
            className={classNames(
              'text-secondaryWhite bg-cardBlue text-lg p-2 rounded-lg border border-0',
              canGoNextMonth ? 'hover:bg-hoverBlue' : 'opacity-30 cursor-not-allowed',
            )}
            disabled={!canGoNextMonth}
            onClick={handleNextMonth}
          >
            <div className="i-material-symbols:chevron-right-rounded w-6 h-6"></div>
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_LABELS.map((label) => (
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
          {days.map((day) => {
            const isCurrentMonth = day.isSame(viewMonth, 'month');
            const isSelected = day.isSame(selectedDate, 'day');
            const isToday = day.isSame(today, 'day');
            const isDisabled =
              (minDate && day.isBefore(minDate, 'day')) ||
              (maxDate && day.isAfter(maxDate, 'day'));

            return (
              <button
                key={day.format('YYYY-MM-DD')}
                disabled={!!isDisabled}
                className={classNames(
                  'w-full aspect-square rounded-full text-sm font-bold flex items-center justify-center transition-colors border border-0 bg-cardBlue',
                  {
                    'bg-primaryBlue text-white': isSelected && !isDisabled,
                    'border border-solid border-primaryBlue text-primaryBlue':
                      isToday && !isSelected && !isDisabled,
                    'text-primaryWhite hover:bg-hoverBlue':
                      isCurrentMonth && !isSelected && !isToday && !isDisabled,
                    'text-secondaryWhite opacity-40': !isCurrentMonth && !isDisabled,
                    'text-secondaryWhite opacity-20 cursor-not-allowed': !!isDisabled,
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
          className={classNames(
            'mt-4 w-full py-3 rounded-full text-sm font-bold transition-colors border border-0',
            isTodayDisabled
              ? 'bg-primaryBlue10 text-secondaryWhite opacity-30 cursor-not-allowed'
              : 'bg-primaryBlue10 text-primaryBlue hover:bg-primaryBlue hover:text-white',
          )}
          disabled={!!isTodayDisabled}
          onClick={handleSelectToday}
        >
          Today
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default Calendar;
