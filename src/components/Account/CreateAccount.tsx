import React, { useState } from 'react';
import { Listbox } from "@headlessui/react";
import { AddStaffMember } from '../../service/StaffService';
import Swal from 'sweetalert2'
import { AddAdminMember } from '../../service/AdminService';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

const CreateAccounts = () => {
    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    });
    const roleOptions = ["ADMIN", "STAFF"];
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoleChange = (value: string) => {
        setUser({ ...user, role: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (user.role === "STAFF") {
                const response = await AddStaffMember(user);
                if (response.status === 200 || response.status === 201) {
                    Swal.fire({
                        title: "Successful!",
                        confirmButtonColor: "#000",
                        text: "Staff Member is Saved!",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        confirmButtonColor: "red",
                        text: "Error uploading data!",
                        icon: "error"
                    });
                    console.error("Error uploading data");
                }
            } else {
                const response = await AddAdminMember(user);
                if (response.status === 200 || response.status === 201) {
                    Swal.fire({
                        title: "Successful!",
                        confirmButtonColor: "#000",
                        text: "Admin Member is Saved!",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        confirmButtonColor: "red",
                        text: "Error uploading data!",
                        icon: "error"
                    });
                    console.error("Error uploading data");
                }
            }
        } catch (error: any) {
            console.error("Create account error:", error);
            setError("Failed to create account. Please try again.");
        } finally {
            setLoading(false);
            setUser({
                firstName: '',
                lastName: '',
                email: '',
                role: ''
            })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">

                <h2 className="text-2xl text-center font-semibold text-slate-800 mb-4">Create Account</h2>
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

                    <Listbox value={user.role} onChange={handleRoleChange}>
                        <div className="relative w-full">
                            {/* Button */}
                            <Listbox.Button className="w-full py-2 px-4 border border-gray-300 rounded-xl bg-white text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
                                {user.role || "Select a role"}
                            </Listbox.Button>

                            {/* Options */}
                            <Listbox.Options className="absolute mt-2 w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded-xl shadow-lg z-20 focus:outline-none">
                                {roleOptions.map((role) => (
                                    <Listbox.Option
                                        key={role}
                                        value={role}
                                        className={({ active, selected }) =>
                                            `px-4 py-2 cursor-pointer transition-colors duration-100 rounded-xl 
                                           ${active ? "bg-gray-900 text-white" : "text-gray-900 bg-white"} 
                                           ${selected ? "font-semibold" : ""}`
                                        }
                                    >
                                        {({ selected }) => (
                                            <div className="flex justify-between items-center">
                                                <span>{role}</span>
                                                {selected && (
                                                    <svg
                                                        className="w-4 h-4 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </Listbox>


                    <button
                        type="submit"
                        className={`w-full px-4 py-3 text-sm font-bold rounded-md transition-colors duration-200 
                            ${loading
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-black text-white hover:bg-black/70"
                            }`}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateAccounts;