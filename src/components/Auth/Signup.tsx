import React, { useState, ChangeEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { EyeOff, Eye, ChevronLeft } from 'lucide-react';
import { useAuth } from './AuthProvider';
import Swal from 'sweetalert2'
import { SignUpTask } from '../../service/AuthService';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
}

const SignUp: React.FC = () => {

    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'USER'
    });
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const [password2, setPassword2] = useState<string>('');
    const [agree, setAgree] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {

        if (user.password !== password2) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const token = await SignUpTask(user);

            if (token !== null || token !== undefined) {
                console.log("Token received:", token);
                login(token);
                setUser({ firstName: "", lastName: "", phoneNumber: "", email: "", password: "", role: "USER" });
                setPassword2("");
                navigate("/");
            } else {
                setError("Failed to create account. Please try again.");
            }


        } catch (error: any) {
            console.error("Create account error:", error);
            setError("Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-start text-left mb-6">
                    <NavLink
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-600 font-semibold hover:underline hover:text-slate-800 transition duration-150"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        Back to Home
                    </NavLink>
                </div>
                <div className="text-center mb-2">
                    <h1 className="text-4xl font-bold text-black tracking-tight">
                        TrackMyItem
                    </h1>
                </div>

                <h2 className="text-2xl text-center font-semibold text-slate-800 mb-4">Sign up</h2>
                <p className="text-gray-600 text-center mb-4">Enter your credentials to continue</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name='firstName'
                            placeholder="First Name"
                            value={user.firstName}
                            onChange={(handleChange)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                        />
                        <input
                            type="text"
                            name='lastName'
                            placeholder="Last Name"
                            value={user.lastName}
                            onChange={(handleChange)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                        />
                    </div>

                    <input
                        type="email"
                        name='email'
                        placeholder="Email"
                        value={user.email}
                        onChange={(handleChange)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                    />

                    <input
                        type="tel"
                        name='phoneNumber'
                        placeholder="Phone Number"
                        value={user.phoneNumber}
                        onChange={(handleChange)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                    />

                    <div className="relative">
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                            name='password'
                            placeholder="Password"
                            value={user.password}
                            onChange={(handleChange)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword1(!showPassword1)}
                        >
                            {showPassword1 ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword2 ? 'text' : 'password'}
                            name='password2'
                            placeholder="Confirm Password"
                            value={password2}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword2(!showPassword2)}
                        >
                            {showPassword2 ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mr-2 accent-slate-600"
                            checked={agree}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAgree(e.target.checked)}
                            required
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to all the <span className="text-red-500">Terms</span> and{' '}
                            <span className="text-red-500">Privacy Policies</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={
                            loading ||
                            !user.email ||
                            !user.password ||
                            !password2 ||
                            user.password !== password2
                        }
                        className={`w-full px-4 py-3 text-sm font-bold rounded-md transition-colors duration-200 
                            ${loading ||
                                !user.email ||
                                !user.password ||
                                !password2 ||
                                user.password !== password2
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-black text-white hover:bg-black/70"
                            }`}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>

                </form>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-slate-600 font-semibold hover:underline">
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
