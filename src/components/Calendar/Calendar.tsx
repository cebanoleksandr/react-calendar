import { useState } from 'react';
import { setDateAC } from '../../redux/dateReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { daysOfWeek, months } from '../../utils/helpers';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import './Calendar.scss';

export const Calendar = () => {
  const currentDate = useAppSelector(state => state.date.currentDate);
  const dayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() - 1 >= 0
    ? new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() - 1
    : 6;
  const firstDay = daysOfWeek[dayIndex].toLowerCase();
  const dispatch = useAppDispatch();
  const [isWeek, setIsWeek] = useState(false);

  const nextMonth = () => {
    dispatch(setDateAC(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    dispatch(setDateAC(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)));
  };

  const nextWeek = () => {
    dispatch(setDateAC(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7)));
  }

  const prevWeek = () => {
    dispatch(setDateAC(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7)));
  }

  const nextDays = () => {
    isWeek
      ? nextWeek()
      : nextMonth();
  }

  const prevDays = () => {
    isWeek
      ? prevWeek()
      : prevMonth();
  }

  const getDaysInMonth = () => {
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    return days;
  };

  const getDaysInWeek = () => {
    const daysOfWeek = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7);
  
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      daysOfWeek.push(day);
    }
  
    console.log(daysOfWeek);
    return daysOfWeek;
  };

  const calendarDays = isWeek ? getDaysInWeek() : getDaysInMonth();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-header__change">
          <button className="btn btn-danger" onClick={prevDays}>&lt;</button>
          
          <button className="btn btn-primary" onClick={nextDays}>&gt;</button>
        </div>

        <div className="calendar-header__date">
          {months[currentDate.getMonth()]}&nbsp;
          {currentDate.getFullYear()}
        </div>

        <div className="calendar-header__type">
          <button className="btn btn-primary" onClick={() => setIsWeek(false)}>
            Month
          </button>
            
          <button className="btn btn-danger" onClick={() => setIsWeek(true)}>
            Week
          </button>
          </div>
      </div>

      <div className="days">
        {daysOfWeek.map(day => (
          <div key={day} className="day">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar">
        {calendarDays.map(day => (
          <CalendarDay
            key={day.getDate()}
            day={day}
            firstDay={firstDay}
            isWeek={isWeek}
          />
        ))}
      </div>
    </div>
  )
}
