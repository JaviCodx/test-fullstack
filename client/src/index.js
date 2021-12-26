import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArchivedNews from './views/ArchivedNews';
import News from './views/News';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="archived" element={<ArchivedNews />} />
        <Route path="news" element={<News />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root')
);

