import React from 'react';
import logo from './logo.svg';
import Weather from './components/Weather';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Weather />
      </header>
    </div>
  );
}

export default App;
