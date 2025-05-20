import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemConsole from './components/Item/ItemConsole';
import RequestConsole from './components/Request/RequestConsole';
import SignUp from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';


function AppWrapper() {
  const location = useLocation();

  // Define routes where NavBar should NOT be shown
  const hideNavbarRoutes = ['/signup' , '/login'];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <NavBar />}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/items" element={<ItemConsole />} />
        <Route path="/requests" element={<RequestConsole />} />
        
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
