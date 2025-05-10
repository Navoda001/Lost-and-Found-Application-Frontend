import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import ItemCard from './components/ItemCard';

function App() {
  return (
    <div className="App">
      <NavBar/>

      <ItemCard/>
    </div>
  );
}

export default App;
