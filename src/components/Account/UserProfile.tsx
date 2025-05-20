import React, { useState } from 'react';
import EditProfile from './EditProfile';

interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
}

const UserProfile: React.FC = () => {

    const [editProfileModal, setEditProfileModal] = useState(false);
    const [user, setUser] = useState<User>({
        userId:'',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: ''
    });
    const handleCloseModal = () => {
        setEditProfileModal(false);
    };

    const loadData =async () => {

    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header Section */}
            <div className="grid grid-rows-2 items-center bg-black text-white rounded-lg p-6 gap-y-6">
                {/* Profile Image & Button */}
                <div className="flex flex-col items-center">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Profile"
                        className="rounded-full border-4 border-white w-36 h-36 object-cover shadow-lg"
                    />
                    <button
                        onClick={() => setEditProfileModal(true)}
                        className="mt-4 px-5 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition">
                        EDIT PROFILE
                    </button>
                </div>

                {/* Name Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Andy Horwitz</h2>
                    <p className="text-gray-300 text-lg">example@gmail.com</p>
                    <p className="text-gray-300 text-lg">0762085246</p>
                </div>

                <EditProfile
                    open={editProfileModal}
                    onClose={handleCloseModal}
                    userId={user.userId}
                    refreshData={loadData}
                />
            </div>
        </div>
    );
};

export default UserProfile;
