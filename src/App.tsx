import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getHolidays } from './api/holidays';
import { setHolidaysAC } from './redux/holidaysReducer';
import './App.scss';
import { Header } from './components/Header/Header';

export const App = () => {
  const currentDate = useAppSelector(state => state.date.currentDate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getHolidays(currentDate.getFullYear())
      .then((response) => {
        dispatch(setHolidaysAC(response.data));
      })  
  }, [currentDate.getFullYear()]);

  return (
    <div className="app">
      <Header />

      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
