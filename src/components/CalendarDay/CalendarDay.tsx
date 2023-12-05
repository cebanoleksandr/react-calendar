import cn from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskList } from '../TaskList/TaskList';
import { useAppSelector } from '../../redux/hooks';
import './CalendarDay.scss';
import { months } from '../../utils/helpers';

type Props = {
  day: Date;
  firstDay: string;
  isWeek: boolean;
}

export const CalendarDay: React.FC<Props> = ({ day, firstDay, isWeek }) => {
  const navigate = useNavigate();
  const year = day.getFullYear();
  const month = (day.getMonth() + 1).toString().length === 2 ? day.getMonth() + 1 : '0' + (day.getMonth() + 1).toString();
  const monthDay = (day.getDate()).toString().length === 2 ? day.getDate() : '0' + (day.getDate()).toString();
  const dayKey = `${year}-${month}-${monthDay}`;
  const comparedDay = new Date();
  const holidays = useAppSelector(state => state.holidays.items).filter(holiday => holiday.date === dayKey);

  const openScheduleHandler = () => {
    navigate(`/${dayKey}`);
  }

  return (
    <div
      className={cn('calendar-day', {
        'mon': day.getDate() === 1 && firstDay === 'mon' && !isWeek,
        'tue': day.getDate() === 1 && firstDay === 'tue' && !isWeek,
        'wed': day.getDate() === 1 && firstDay === 'wed' && !isWeek,
        'thu': day.getDate() === 1 && firstDay === 'thu' && !isWeek,
        'fri': day.getDate() === 1 && firstDay === 'fri' && !isWeek,
        'sat': day.getDate() === 1 && firstDay === 'sat' && !isWeek,
        'sun': day.getDate() === 1 && firstDay === 'sun' && !isWeek,
        'active-day': day.getFullYear() === comparedDay.getFullYear()
          && day.getMonth() === comparedDay.getMonth()
          && day.getDate() === comparedDay.getDate()
      })}
      onClick={openScheduleHandler}
    >
      <div className={cn('date', {
        'text-danger': !!holidays.length
      })}>
        {day.getDate()}&nbsp;
        {months[day.getMonth()]}
      </div>

      {!!holidays.length && (
        <p className="text-danger holiday-cell">
          {holidays[0].name}
        </p>
      )}

      <TaskList dayKey={dayKey} />
    </div>
  )
}
