import React, { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2'
import { getUser } from '../Auth/AuthProvider';
import { UpdateRequest } from '../../service/RequestService';
import { GetUserById } from '../../service/UserService';
import { GetStaffById } from '../../service/StaffService';

interface Request {
    requestId: string;
    itemId: string;
    itemName: string;
    userId: string;
    userName: string;
    requestStatus: string;
    requestDate: [number, number, number];
    message: string;
    decisionDate: string;
    decisionEmail: string;
    getDecisionBy: string;
}

interface Response {
    message: string;
    requestStatus: string;
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

interface RequestActionProps {
    openRequest: boolean;
    request: Request | null;
    onClose: () => void;
    refreshData: () => Promise<void>;
}

const RequestAction: React.FC<RequestActionProps> = ({
    openRequest,
    request,
    onClose,
    refreshData
}) => {

    const [isApproving, setIsApproving] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    const [userData, setUserData] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    })
    const [staffData, setStaffData] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    })
    const [responseData, setResponseData] = useState<Response>({
        message: '',
        requestStatus: '',
    });
    const decode = getUser();
    const FetchUser = async () => {
        if (!request?.userId) return;
        console.log("userId", request.userId)
        const response = await GetUserById(request.userId);
        setUserData(response);
        console.log("user", userData)
    };

    const fetchStaffById = async () => {
        if (!request?.getDecisionBy) return; // safety check

        try {
            const response = await GetStaffById(request.getDecisionBy);
            setStaffData(response);
        } catch (error) {
            console.error("Failed to fetch staff data:", error);
        }
    };


    useEffect(() => {

        if (openRequest) {
            FetchUser();
        }

        if (request?.getDecisionBy) {
            fetchStaffById();
        }

    }, [openRequest, request]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResponseData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    if (!openRequest) return null;

    const handleReject = async () => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to reject this request? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#888",
            confirmButtonText: "Yes, reject it"
        });

        if (!confirm.isConfirmed) return;

        try {
            setIsRejecting(true);

            const updatedData = { ...responseData, requestStatus: "REJECTED", decisionEmail: decode?.sub };

            const response = await UpdateRequest(request?.requestId, updatedData);

            if (response.status === 204) {
                Swal.fire({
                    title: "Request Rejected",
                    text: "The request was successfully rejected.",
                    icon: "success",
                    confirmButtonColor: "#000"
                });
                await refreshData();
                onClose();
            } else if (response.status === 400) {
                Swal.fire({
                    title: "Invalid Request",
                    text: "The request could not be processed. Please check the input and try again.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            } else if (response.status === 404) {
                Swal.fire({
                    title: "Not Found",
                    text: "The request you are trying to reject does not exist.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            } else if (response.status === 500) {
                Swal.fire({
                    title: "Server Error",
                    text: "An internal server error occurred while rejecting the request. Please try again later.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            } else {
                Swal.fire({
                    title: "Unknown Error",
                    text: `Unexpected response status: ${response.status}. Please try again or contact support.`,
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            }
        } catch (error: any) {
            console.error("Error rejecting request:", error);
            Swal.fire({
                title: "Network Error",
                text: error?.message || "Failed to reject the request due to a network or server error.",
                icon: "error",
                confirmButtonColor: "#d33"
            });
        } finally {
            setIsRejecting(false);
        }
    };


    const handleApproved = async () => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to approve this request? This action cannot be undone.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#888",
            confirmButtonText: "Yes, approve the request"
        });

        if (!confirm.isConfirmed) return;

        try {
            setIsApproving(true);

            const updatedData = { ...responseData, requestStatus: "APPROVED", decisionEmail: decode?.sub };

            const response = await UpdateRequest(request?.requestId, updatedData);

            if (response.status === 204) {
                await Swal.fire({
                    title: "Approved!",
                    text: "The request has been successfully approved.",
                    icon: "success",
                    confirmButtonColor: "#000",
                });
                await refreshData();
                onClose();
            } else if (response.status === 400) {
                Swal.fire({
                    title: "Invalid Data",
                    text: "The provided information seems incorrect or incomplete. Please check and try again.",
                    icon: "warning",
                    confirmButtonColor: "#d33"
                });
            } else if (response.status === 404) {
                Swal.fire({
                    title: "Request Not Found",
                    text: "The request you're trying to approve no longer exists.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            } else if (response.status === 500) {
                Swal.fire({
                    title: "Server Error",
                    text: "Something went wrong on the server. Please try again later.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            } else {
                Swal.fire({
                    title: "Unexpected Error",
                    text: `Failed to approve the request. [Error Code: ${response.status}]`,
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            }

        } catch (error: any) {
            console.error("Error during approval:", error);
            Swal.fire({
                title: "Network Error",
                text: error?.message || "Failed to connect to the server. Please check your internet connection and try again.",
                icon: "error",
                confirmButtonColor: "#d33"
            });
        } finally {
            setIsApproving(false);
        }
    };

    const formatDate = (rawDate: string | [number, number, number] | null | undefined): string => {
        if (!rawDate) return "N/A";

        // Handle LocalDate serialized as [YYYY, MM, DD]
        if (Array.isArray(rawDate)) {
            const [year, month, day] = rawDate;
            return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
        }

        const date = new Date(rawDate);
        if (isNaN(date.getTime())) return rawDate.toString();

        return date.toISOString().split("T")[0].replace(/-/g, "/");
    };

    return (
        <div
            onClick={onClose}
            className="fixed h-full inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm animate-fadeIn"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transition-all duration-300"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold transition-colors duration-200"
                >
                    &times;
                </button>

                {request?.requestStatus === "PENDING" ? (
                    <>
                        {/* Header */}
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Request Action</h2>
                        <div className='text-left'>
                            <p className="text-sm text-gray-600 mb-4">
                                Request ID: <span className="font-medium text-black">{request?.requestId}</span>
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                                User Name: <span className="font-medium text-black">{userData.firstName}{' '}{userData.lastName}</span>
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                                Phone Number: <span className="font-medium text-black">{userData.phoneNumber}</span>
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                                Email: <span className="font-medium text-black">{userData.email}</span>
                            </p>
                        </div>

                        {/* Message Input */}
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={responseData.message}
                            onChange={handleChange}
                            placeholder="Write a message (optional)"
                            rows={3}
                            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200 resize-none"
                        />

                        {/* Action Buttons */}
                        <div className="mt-6 flex justify-between gap-4">
                            <button
                                onClick={handleReject}
                                disabled={isRejecting}
                                className={`w-1/2 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition 
              ${isRejecting
                                        ? "bg-red-300 cursor-not-allowed text-red-800"
                                        : "bg-red-200 text-red-800 hover:bg-red-300"
                                    }`}
                            >
                                {isRejecting ? "Rejecting..." : "Reject"}
                            </button>

                            <button
                                onClick={handleApproved}
                                disabled={isApproving}
                                className={`w-1/2 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition 
              ${isApproving
                                        ? "bg-green-300 cursor-not-allowed text-green-800"
                                        : "bg-green-200 text-green-800 hover:bg-green-300"
                                    }`}
                            >
                                {isApproving ? "Approving..." : "Approve"}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Request</h2>
                        <div className='text-left'>
                            <p className="text-sm text-gray-600 mb-3">Status: <span className={`px-2 py-1 text-sm font-semibold rounded-full ${request?.requestStatus === "APPROVED"
                                ? " text-green-800"
                                : request?.requestStatus === "REJECTED"
                                    ? " text-red-800"
                                    : " text-yellow-800"
                                }`}>{request?.requestStatus}</span></p>
                            {request?.message?.trim() && (
                                <p className="text-sm text-gray-600 mb-3">
                                    Message: {request.message}
                                </p>
                            )}
                            <p className="text-sm text-gray-600 mb-3">Decision Date: {formatDate(request?.decisionDate)}</p>
                            <p className="text-sm text-gray-600 mb-3">Decision By: {request?.getDecisionBy} - {staffData.firstName}{' '}{staffData.lastName}</p>
                            <p className='text-sm text-gray-600 mb-3'>Contact: {staffData.email} </p>
                        </div>
                    </>
                )}
            </div>
        </div>

    );
};

export default RequestAction;
