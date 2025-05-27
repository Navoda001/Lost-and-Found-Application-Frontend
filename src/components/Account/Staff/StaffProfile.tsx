import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile';
import ImageUpload from './ImageUpload';
import { getUser } from "../../auth/AuthProvider"
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from 'react-router';
import { GetStaffByEmail } from '../../../service/StaffService';

interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    image: string;
}



const StaffProfile: React.FC = () => {

    const [editProfileModal, setEditProfileModal] = useState(false);
    const [user, setUser] = useState<User>({
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        image: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const decode = getUser();
    const { isAuthenticated } = useAuth();
    const handleCloseModal = () => {
        setEditProfileModal(false);
    };

    const loadData = async () => {
       
        if (!decode?.sub) {
            console.error("Decoded token or sub is missing");
            return;
        } 
        console.log("decode",decode.sub)

        const response = await GetStaffByEmail(decode.sub)
        setUser(response);
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header Section */}
            <div className="grid grid-rows-2 items-center bg-black text-white rounded-lg p-6 gap-y-6">
                {/* Profile Image & Button */}
                {isAuthenticated ? (
                    <>
                        <div className="flex flex-col items-center">
                            <div className="relative w-36 h-36">
                                <img
                                    src={user.image ? user.image : 'profile.jpg'}
                                    alt="Profile"
                                    className="rounded-full border-4 border-white w-36 h-36 object-cover shadow-lg"
                                />

                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                                    aria-label="Upload profile image"
                                >
                                    {/* Camera icon svg */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-black"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 7h2l3-3h8l3 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z"
                                        />
                                        <circle cx="12" cy="13" r="3" />
                                    </svg>
                                </button>

                                <ImageUpload
                                    isOpen={isModalOpen}
                                    email={user.email}
                                    refreshData={loadData}
                                    onClose={() => setIsModalOpen(false)}
                                />
                            </div>
                            <button
                                onClick={() => setEditProfileModal(true)}
                                className="mt-4 px-5 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition">
                                EDIT PROFILE
                            </button>
                        </div>

                        {/* Name Section */}
                        <div className="text-center">
                            <h2 className="text-3xl font-bold">{user.firstName}{' '}{user.lastName}</h2>
                            <p className="text-gray-300 text-lg">{user.email}</p>
                            <p className="text-gray-300 text-lg">{user.phoneNumber}</p>
                        </div>

                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => navigate("/")}
                                className="mt-10 w-[50%] px-5 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
                            >
                                Go to Home
                            </button>
                        </div>

                    </>
                )}


                <EditProfile
                    open={editProfileModal}
                    onClose={handleCloseModal}
                    user={user}
                    refreshData={loadData}
                />
            </div>
        </div>
    );
};

export default StaffProfile;
