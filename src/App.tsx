import React, { useState } from "react";
import './App.css';
import NavBar from './components/NavBar';
import ItemCard from './components/ItemCard';
import ItemModel from './components/ItemModel';

function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="App">
      <NavBar/>

      <ItemCard onReadMore={() => setOpenModal(true)} />

       <ItemModel open={openModal} onClose={() => setOpenModal(false)} />

    </div>
  );
}

export default App;
