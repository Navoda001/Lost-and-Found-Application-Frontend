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

      {/* Content Section */}
      <div className="max-w-screen-md mx-auto px-4 py-12">
        <div className="mb-12 rounded-lg overflow-hidden shadow-md">
          <img
            alt="nature"
            className="w-full h-[32rem] object-cover object-center"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?auto=format&fit=crop&w=2717&q=80"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">What is Material Tailwind</h2>
        {[...Array(5)].map((_, index) => (
          <p key={index} className="text-gray-600 mb-4 leading-relaxed">
            Can you help me out? You will get a lot of free exposure doing this. Can my website be in English? There is
            too much white space, do less with more. So that will be a conversation piece. Can you rework to make the
            pizza look more delicious? Other agencies charge much less. Can you make the blue bluer? I think we need to
            start from scratch. Make it sexy. I’ll pay you in a week. We don’t need to pay upfront. I hope you
            understand. Can you make it stand out more? Make the font bigger. Are you busy this weekend? I have a new
            project with a tight deadline. There are more projects lined up—charge extra next time.
          </p>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
