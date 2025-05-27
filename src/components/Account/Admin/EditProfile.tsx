import React, { useState, ChangeEvent, useEffect } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import Swal from 'sweetalert2'
import { ChangePassword } from '../../../service/AuthService';
import { UpdateAdmin } from '../../../service/AdminService';

interface User {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
}

interface EditProfileProps {
    open: boolean;
    onClose: () => void;
    refreshData: () => Promise<void>;
    user: User | null;
}

const EditProfile: React.FC<EditProfileProps> = ({ open, onClose, user, refreshData }) => {

    const [userData, setUserData] = useState<User>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
    });
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
     const [showPassword3, setShowPassword3] = useState<boolean>(false);
    const [password2, setPassword2] = useState<string>('');
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loading2, setLoading2] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user, open])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Always call this first
        console.log("User data submitted:", userData);
        setLoading(true);
        setError("");

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to Update your profile?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#888",
            confirmButtonText: "Yes, Update it!",
        });
        if (!confirm.isConfirmed) return;
        try {

            const response = await UpdateAdmin(userData);

            if (response.status === 204) {
                Swal.fire({
                    title: 'Success',
                    text: 'Profile updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#000",
                });
                await refreshData();
                onClose();
                setLoading(false);
            } else {
                Swal.fire({
                    title: 'Update Failed',
                    text: `Server responded with status ${response.status}`,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: "red",
                });
            }
        } catch (error: any) {
            console.error("Error updating user:", error);

            Swal.fire({
                title: 'Error',
                text: error?.response?.data?.message || 'An unexpected error occurred',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: "red",
            });
        }
    };


    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== password2) {
            setError("Passwords do not match");
            return;
        }
        setLoading2(true);
        setError("");

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to Update your Password?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#888",
            confirmButtonText: "Yes, Update it!",
        });
        if (!confirm.isConfirmed) return;

        try {
            const response = await ChangePassword({
                email: userData.email,
                currentPassword: currentPassword,
                newPassword: password
            });

            if (response.status === 201) {
                Swal.fire({
                    title: 'Success',
                    text: 'Password updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#000",
                });
                await refreshData();
                onClose();
                setPassword2("");
                setCurrentPassword("");
                setPassword("");

                setLoading2(false);
            } else {
                Swal.fire({
                    title: 'Update Failed',
                    text: `Server responded with status ${response.status}`,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: "red",
                });
            }
        } catch (error: any) {
            console.error("Error updating password:", error);
            if (error?.response?.status === 503) {
                setError("Current password is incorrect");
            } else {
                Swal.fire({
                    title: 'Error',
                    text: error?.response?.data?.message || 'An unexpected error occurred',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: "red",
                });
            }


        } finally {
            setLoading2(false);
        }
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
                            value={userData.firstName}
                            onChange={(handleChange)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                        />
                        <input
                            type="text"
                            name='lastName'
                            placeholder="Last Name"
                            value={userData.lastName}
                            onChange={(handleChange)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-sm font-bold rounded-md transition-colors duration-200 bg-black text-white hover:bg-black/70"

                    >
                        {loading ? "Changing..." : "Change"}
                    </button>

                </form>

                <form onSubmit={handleChangePassword} className="mt-5 space-y-4 text-black">

                    <div className="relative">
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                            name='currentPassword'
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
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
                            onClick={() => setShowPassword2(!showPassword2)}
                        >
                            {showPassword2 ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword3 ? 'text' : 'password'}
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
                            onClick={() => setShowPassword3(!showPassword3)}
                        >
                            {showPassword3 ? (
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
                        className="w-full px-4 py-3 text-sm font-bold rounded-md transition-colors duration-200 bg-black text-white hover:bg-black/70"

                    >
                        {loading2 ? "Changing..." : "Change Password"}
                    </button>

                </form>

            </div>
        </div>
    );
};

export default EditProfile;