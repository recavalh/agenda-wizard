import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Bem-vindo à Agenda Wizard</h1>
      <div style={{ marginTop: '20px' }}>
        <Link to="/agenda" style={{ marginRight: '20px', textDecoration: 'none', fontSize: '20px' }}>Agenda</Link>
        <Link to="/meus-dados" style={{ textDecoration: 'none', fontSize: '20px' }}>Meus Dados</Link>
      </div>
    </div>
  );
}

export default Home;
