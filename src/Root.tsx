import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Calendar } from './components/Calendar/Calendar';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Schedule } from './components/Schedule/Schedule';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Calendar />} />
        <Route path=":date" element={<Schedule />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);
