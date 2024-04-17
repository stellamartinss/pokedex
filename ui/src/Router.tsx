import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';

const Router = (): JSX.Element => {
  return (
    <div className='grid grid-cols-12 gap-4 h-screen"'>
      <div className='col-span-12 bg-white p-4 w-full'>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/:id' Component={PokemonDetails} />
            <Route Component={NotFound} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Router;
