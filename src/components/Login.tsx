import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";
import mediImage from '../Images/medi.jpeg';
import Swal from "sweetalert2";

// 🔧 Placeholder functions to avoid errors
// Replace these with your actual authentication logic
const doSignInWithGoogle = async () => {
    return { user: { uid: "123", email: "example@gmail.com" } };
};
const setCurrentUser = (user: any) => {
    console.log("User set:", user);
};
const setUserLoggedIn = (status: boolean) => {
    console.log("Login status:", status);
};

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Your sign-in logic goes here
            if (email === "test@example.com" && password === "123456") {
                setCurrentUser({ email });
                setUserLoggedIn(true);
                Swal.fire({
                    title: "Success!",
                    confirmButtonColor: "#000",
                    text: "Logged in successfully.",
                    icon: "success"
                });
                navigate("/items");
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (err: any) {
            setError(err.message || "Failed to sign in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="background-radial-gradient overflow-hidden min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-glass rounded-lg shadow-md p-8">
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

                <form onSubmit={handleEmailSignIn} className="space-y-6">
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="john.doe@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                            required
                            disabled={loading}
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                    <a
                        href="/SignupPage"
                        className="text-slate-600 font-semibold hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
