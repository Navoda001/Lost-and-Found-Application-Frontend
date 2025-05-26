import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemConsole from './components/Item/ItemConsole';
import RequestConsole from './components/Request/RequestConsole';
import SignUp from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Home from './components/Home';
import Profile from './components/Account/UserProfile';



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
        <Route path="/account" element={<Profile/>} />
        
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
