import React from 'react';
import Weather from './components/Weather';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <div className="logo-litm"></div>
          <p className="logo-name">LITM Academy</p>
        </div>
      </header>
      <div className="body">
        <Weather />
      </div>
    </div>
  );
}

export default App;
