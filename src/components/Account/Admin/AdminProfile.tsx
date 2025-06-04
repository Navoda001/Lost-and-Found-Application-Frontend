import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile';
import { getUser } from "../../Auth/AuthProvider"
import { useAuth } from "../../Auth/AuthProvider";
import { useNavigate } from 'react-router';
import { GetAdminByEmail } from '../../../service/AdminService';

interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    image: string;
}



const AdminProfile: React.FC = () => {

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
        const response = await GetAdminByEmail(decode.sub)
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

export default AdminProfile;
