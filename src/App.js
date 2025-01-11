import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Agenda from './components/Agenda';
import MeusDados from './components/MeusDados';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/meus-dados" element={<MeusDados />} />
      </Routes>
    </Router>
  );
}

export default App;
