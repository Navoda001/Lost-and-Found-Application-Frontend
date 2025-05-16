import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import ItemConsole from "./components/Item/ItemConsole";
import RequestConsole from './components/Request/RequestConsole';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/items" element={<ItemConsole />} />
          <Route path="/requests" element={<RequestConsole />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
