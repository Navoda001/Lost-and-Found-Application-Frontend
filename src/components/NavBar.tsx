import React from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthProvider";



const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleOnClick = () => {
    logout();
    navigate("/")
  }

  const [openNav, setOpenNav] = React.useState(false);
  const navItems = ["Items", "Requests", "Account"];

  const navList = (
    <ul className="flex flex-col gap-3 mt-4 mb-4 lg:mt-0 lg:mb-0 lg:flex-row lg:items-center lg:gap-8">
      {navItems.map((item) => (
        <li key={item}>
          <NavLink
            to={`/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `group relative px-2 py-1 text-base font-medium transition-colors duration-300
             ${isActive ? "text-black font-semibold" : "text-gray-700 hover:text-black"}`
            }
          >
            {({ isActive }) => (
              <>
                {item}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-black transform transition-transform duration-300 origin-left
                  ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                `}
                ></span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );


  return (
    <div className="mt-2">
      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full bg-white/95 shadow-lg backdrop-blur-md px-4 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-black tracking-tight">
            TrackMyItem
          </a>

          <div className="flex items-center gap-4">


            {/* Desktop Auth Buttons */}

            <div className="hidden lg:flex items-center gap-8">
              {isAuthenticated ? (
                <>
                  {/* Desktop Nav */}
                  <div className="hidden lg:block">{navList}</div>
                  <button
                    onClick={handleOnClick}
                    className="inline-block px-4 py-2 text-sm font-medium bg-red-200 text-red-800 hover:bg-red-300 rounded transition duration-300 shadow">
                    Log Out
                  </button>
                </>
              ) : (
                <>
                <NavLink
                  to="/login"
                  className="inline-block px-4 py-2 text-sm font-medium text-black hover:text-white hover:bg-black border border-black rounded transition duration-300"
                >
                  Log In
                </NavLink>
                  <NavLink
                    to="/signup"
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded transition duration-300 shadow"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="block lg:hidden text-black focus:outline-none"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {openNav && (
          <div className="mt-4 lg:hidden">

            <div className="flex flex-col gap-2 mt-4">

              {isAuthenticated ? (
                <>
                  {navList}
                  <button
                    onClick={handleOnClick}
                    className=" inline-block px-4 py-2 text-sm font-medium bg-red-200 text-red-800 hover:bg-red-300 rounded transition duration-300 shadow">
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="inline-block px-4 py-2 text-sm font-medium text-black hover:text-white hover:bg-black border border-black rounded transition duration-300"
                  >
                    Log In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded transition duration-300 shadow"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

export default NavBar;
