import React from 'react';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import './App.css';

const App = () => {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Home  />
      </main>
    </>
  );
}

export default App;
