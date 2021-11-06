import React, { useEffect, useState } from 'react';
import Home from './Home/Home';
import Header from './Header/Header';
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
