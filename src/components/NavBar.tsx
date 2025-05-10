import React from "react";

const NavBar: React.FC = () => {
const [openNav, setOpenNav] = React.useState(false);
const [activeNav, setActiveNav] = React.useState("Items");

const navItems = ["Items", "Requests", "Account"];

const navList = (
  <ul className="flex flex-col gap-2 mt-4 mb-4 lg:mt-0 lg:mb-0 lg:flex-row lg:items-center lg:gap-6">
    {navItems.map((item) => (
      <li key={item}>
        <a
          href="#"
          onClick={() => setActiveNav(item)}
          className={`text-blue-gray-700 font-medium transition-colors hover:text-blue-600 ${
            activeNav === item ? "underline font-semibold text-blue-800" : ""
          }`}
        >
          {item}
        </a>
      </li>
    ))}
  </ul>
);


  return (
    <div className="mt-2">
      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full bg-white/90 shadow-md px-4 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="text-lg font-semibold text-gray-800">
            TrackMyItem
          </a>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">{navList}</div>
            <div className="hidden lg:flex items-center gap-2">
              <button className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Log In
              </button>
              <button className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow">
                Sign In
              </button>
            </div>
            <button
              className="block lg:hidden text-gray-800 focus:outline-none"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {openNav && (
          <div className="mt-3 lg:hidden">
            {navList}
            <div className="flex flex-col gap-2 mt-2">
              <button className="w-full py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Log In
              </button>
              <button className="w-full py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
