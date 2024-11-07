import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetAll from './pages/GetAll';
import Layout from './pages/Layout';
import SongDetail from './pages/SongDetail';
import AddSong from './pages/AddSong'; 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GetAll />} /> 
        <Route path="songs/:id" element={<SongDetail />} />
        <Route path="add-song" element={<AddSong />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
