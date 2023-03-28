import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieDetails from './MovieDetails';
import Series from './components/Series';
import SeriesDetails from './components/SeriesDetails'
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path={'/movie/:id'} element={<MovieDetails id='id' />}></Route>
      <Route path='/series' element={<Series />}></Route>
      <Route path={'/series/:id'} element={<SeriesDetails id='id' />}></Route>

    </Routes>
  </Router>
);

