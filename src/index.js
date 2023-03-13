import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieDetails from './MovieDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path={'/movie/:id'} element={<MovieDetails id='id'/>}> </Route>
    

    </Routes>
  </Router>
);

