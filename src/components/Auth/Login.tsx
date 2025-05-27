import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { EyeOff, Eye , ChevronLeft  } from "lucide-react";
import Swal from "sweetalert2";
import { LogInTask } from "../../service/AuthService";
import { useAuth } from "./AuthProvider";

const Login: React.FC = () => {

    interface LogIn {
        email: string;
        password: string;
    }

    const { login } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [user, setUser] = useState<LogIn>({
        email: "",
        password: ""
    });
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {

            const token = await LogInTask(user)
            if (token !== null || token !== undefined) {
                setError("");
                console.log("Token received:", token);
                login(token);
                navigate("/");
            } else {
                throw new Error("Invalid credentials");
                setError("Invalid credentials");
            }
        } catch (err: any) {
            setError(err.message || "Failed to sign in");
            setError("Failed to sign in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="background-radial-gradient overflow-hidden min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-glass rounded-lg shadow-md p-8">
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
                    <h1 className="text-4xl mb-4 font-bold text-black tracking-tight">
                        TrackMyItem
                    </h1>
                    <h2 className="text-2xl font-bold text-slate-00">Welcome Back</h2>
                </div>

                <p className="text-center text-gray-600 mb-8">
                    Enter your credentials to continue
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogIn} className="space-y-6">
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="john.doe@gmail.com"
                            name="email"
                            value={user.email}
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                            required
                            disabled={loading}
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••••••••••••"
                                name="password"
                                value={user.password}
                                onChange={handleOnChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="peer h-4 w-4 accent-slate-500 focus:ring-sky-500 border-gray-300 rounded bg-white"
                                disabled={loading}
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>
                        <a
                            href="/forgotpassword"
                            className="text-sm text-slate-900 hover:text-slate-500"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-3 bg-black text-white text-sm font-bold rounded-md  transition-colors duration-200 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-black/70"
                            }`}
                    >
                        {loading ? "Logging in..." : "Login In"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <NavLink
                        to="/signup"
                        className="text-slate-600 font-semibold hover:underline"
                    >
                        Sign up
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
