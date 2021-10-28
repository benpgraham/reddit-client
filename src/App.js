import React, { useEffect, useState } from 'react';
import PostTiles from './Posts/PostTiles/PostTiles';
import Reddit from './Reddit/services';
import Home from './Home/Home';
import { FaReddit } from 'react-icons/fa';
import './App.css';

const App = () => {

  return (
    <>
      <header>
        <div className="logo">
          <FaReddit className="logo-reddit" />
          <h1>SHIT REDDIT</h1>
        </div>
      </header>
      <main>
        <Home  />
      </main>
    </>
  );
}

export default App;
