import React from 'react';
import RNavBar from './Components/Navbar/ResponsiveNavbar';
import Home from './Components/Home/HomeComponent';
import TypeCalculator from './Components/Calculator/TypeCalculator';
import SearchPokemon from './Components/Search/SearchPokemon';
import SearchMove from './Components/Search-Move/SearchMove';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="pokeapp">
      <RNavBar/>
      <Switch>
        <Route path="/calc">
          <TypeCalculator/>
        </Route>
        <Route path="/search">
          <SearchPokemon/>
        </Route>
        <Route path="/move">
          <SearchMove/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
