import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';
import CaughtPokemons from './pages/CaughtPokemons/CaughtPokemons';
import ActionBar from './components/ActionBar/ActionBar';

const Router = (): JSX.Element => {
  return (
    <div className='items-center h-screen"'>
      <div className='bg-red-600 p-4 w-full '>
        <BrowserRouter>
          <ActionBar />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/:id' Component={PokemonDetails} />
            <Route path='/caught-pokemons' Component={CaughtPokemons} />
            <Route Component={NotFound} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Router;
