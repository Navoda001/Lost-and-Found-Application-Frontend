import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOff, Eye } from 'lucide-react';
import Swal from 'sweetalert2'

interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

interface EditProfileProps {
    open: boolean;
    onClose: () => void;
    refreshData: () => Promise<void>;
    userId: string | null;
}

const EditProfile: React.FC<EditProfileProps> = ({ open, onClose, userId, refreshData }) => {

    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [password, setPassword] = useState<string>('');
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const [password2, setPassword2] = useState<string>('');
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async () => {


    };

    const handleChangePassword = async () => {

    }

    if (!open) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-black font-bold">Edit Profile</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-red-500 text-xl ">
                        &times;
                    </button>
                </div>
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

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full px-4 py-3 text-sm font-bold rounded-md transition-colors duration-200 bg-black text-white hover:bg-black/70"

                    >
                        {loading ? "Changing..." : "Change"}
                    </button>

                </form>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-black">

                    <div className="relative">
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                            name='password'
                            placeholder="Password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        onClick={handleChangePassword}
                        className="w-full px-4 py-3 text-sm font-bold rounded-md transition-colors duration-200 bg-black text-white hover:bg-black/70"

                    >
                        {loading ? "Changing..." : "Change Password"}
                    </button>

                </form>

            </div>
        </div>
    );
};

export default EditProfile;