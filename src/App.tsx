import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import ItemConsole from "./components/Item/ItemConsole";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemConsole />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
