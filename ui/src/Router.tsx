import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import ActionBar from './components/ActionBar/ActionBar';

const Router = (): JSX.Element => {
  return (
    <div className='grid grid-cols-12 gap-4 h-screen"'>
      <div className='col-span-3 bg-gray-200 p-4'>
        <ActionBar />
      </div>

      <div className='col-span-9 bg-white p-4'>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={Home} />
            <Route Component={NotFound} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Router;
