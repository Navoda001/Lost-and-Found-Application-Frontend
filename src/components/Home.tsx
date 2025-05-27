import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "./auth/AuthProvider";

const Home: React.FC = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div className="relative min-h-screen bg-cover bg-center text-white" style={{ backgroundImage: `url('/home.jpg')` }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>


            {/* Content */}
            <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-52">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    Helping You Reconnect with What Matters
                </h1>
                <p className="text-md md:text-lg max-w-2xl mb-8">
                    TrackMyItem makes it easy to report, find, and claim lost items—bringing you closer to what matters most.
                </p>

                {isAuthenticated ? (
                    <>
                        <NavLink to='/items'>
                            <button className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-300 transition">
                                FIND IT HERE
                            </button>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to='/login'>
                            <button className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-300 transition">
                                Get Started
                            </button>
                        </NavLink>
                    </>
                )}

            </main>
        </div>
    );
};

export default Home;
