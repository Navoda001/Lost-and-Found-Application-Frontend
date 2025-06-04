import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import SignUp from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ItemConsole from './components/Item/ItemConsole';
import RequestConsole from './components/Request/RequestConsole';
import UserProfile from './components/Account/user/UserProfile';
import MyItemConsole from './components/Item/MyItems/MyItemConsole';
import MyRequestConsole from './components/Request/MyRequest/MyRequestConsole';
import StaffProfile from './components/Account/Staff/StaffProfile';
import AdminProfile from './components/Account/Admin/AdminProfile';
import CreateAccounts from './components/Account/CreateAccount';
import { AuthProvider } from './components/Auth/AuthProvider';



function AppWrapper() {
  const location = useLocation();

  // Define routes where NavBar should NOT be shown
  const hideNavbarRoutes = ['/signup', '/login'];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path="/items" element={<ItemConsole />} />
        <Route path="/requests" element={<RequestConsole />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/myitems" element={<MyItemConsole/>} />
        <Route path='/myrequests' element={<MyRequestConsole/>}/>
        <Route path='/staffprofile' element={<StaffProfile/>}/>
        <Route path='/adminprofile' element={<AdminProfile/>}/>
        <Route path='/addaccounts' element={<CreateAccounts/>}/>


      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppWrapper />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
