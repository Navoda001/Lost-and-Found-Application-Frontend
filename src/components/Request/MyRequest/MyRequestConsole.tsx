import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { GetAllRequestsByEmail } from "../../../service/RequestService";
import { getUser } from "../../auth/AuthProvider";
import { GetItemById } from "../../../service/ItemService";

const MyRequestConsole = () => {
    interface Request {
        requestId: string;
        itemId: string;
        itemName: string;
        userId: string;
        userName: string;
        requestStatus: string;
        requestDate: [number, number, number]; // [year, month, day]
        message: string;
        decisionDate: string;
        getDecisionBy: string;
        image: string;
    }

    const TABLE_HEAD = ["Request Id", "Item Id", "Item Name", "Status", "Request Date", ""];

    const [requestData, setRequestData] = useState<Request[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const decode = getUser();
    const containerRef = useRef<HTMLDivElement>(null);

    const formatDate = (dateArr: [number, number, number]) => {
        const [year, month, day] = dateArr;
        return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
    };

    const loadData = async () => {
        try {
            const responseRequests = await GetAllRequestsByEmail(decode?.sub || "");
            setRequestData(responseRequests);
            console.log("Request data:", responseRequests);
        } catch (error: any) {
            if (error?.response?.status === 401) {
                navigate("/unauth");
            } else {
                console.error("Failed to load requests:", error);
            }
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredRows = requestData.filter(req => {
        const matchesStatus =
            filterStatus === "ALL" || req.requestStatus.toUpperCase() === filterStatus;

        const matchesSearch = req.itemName.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    const handleAction = (row: Request) => {
        if (row.requestStatus.toLowerCase() === "pending") {
            setSelectedRequest(row);
            setModalOpen(true);
        } else {
            alert(`Viewing request ${row.requestId}`);
        }
    };

    return (
        <div className="p-6 z-0" ref={containerRef}>
            <h1 className="text-[60px] font-bold font-serif uppercase text-center text-[#2c3e50] ">
                My Requests
            </h1>

            {/* Filter Buttons & Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <div className="flex flex-wrap gap-2">
                    {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status as any)}
                            className={`px-4 py-2 text-sm font-medium rounded-md border transition ${filterStatus === status
                                ? "bg-black text-white hover:bg-white hover:text-black"
                                : "bg-white text-black hover:bg-gray-200"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder="Search by item name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-md shadow-sm w-full md:w-[50%] focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Requests Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                <table className="min-w-full table-auto border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRows.map((row) => (
                            <tr
                                key={row.requestId}
                                className="border-b text-left hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3 font-medium text-md text-gray-800">
                                    {row.requestId}
                                </td>
                                <td className="px-4 py-3 font-medium text-md text-gray-800">
                                    {row.itemId}
                                </td>
                                <td className="px-4 py-3 font-medium text-md text-gray-800">
                                    {row.itemName}
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 text-sm font-semibold rounded-full ${row.requestStatus === "APPROVED"
                                            ? "bg-green-200 text-green-800"
                                            : row.requestStatus === "REJECTED"
                                                ? "bg-red-200 text-red-800"
                                                : "bg-yellow-200 text-yellow-800"
                                            }`}
                                    >
                                        {row.requestStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-medium text-md text-gray-700">
                                    {formatDate(row.requestDate)}
                                </td>
                                <td className="py-3 text-left">
                                    <button
                                        onClick={() => handleAction(row)}
                                        className="px-4 py-2 text-sm font-medium rounded-md border transition bg-black text-white hover:bg-white hover:text-black"
                                    >
                                        {row.requestStatus.toLowerCase() === "pending"
                                            ? "Action"
                                            : "View"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for showing detailed info about selected request */}
            {modalOpen && selectedRequest && (
                <div
                    onClick={() => setModalOpen(false)}
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-bold mb-4 text-center">Request Details</h2>

                        {/* Image Section */}
                        <div className="w-full h-auto overflow-hidden mb-4">
                            <img
                                src={
                                    selectedRequest.image ||
                                    "https://png.pngtree.com/png-vector/20210827/ourmid/pngtree-new-item-poster-png-image_3834274.jpg"
                                }
                                alt={selectedRequest.itemName}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="text-sm space-y-3">
                            <p>
                                <strong>Request ID:</strong> {selectedRequest.requestId}
                            </p>
                            <p>
                                <strong>Item ID:</strong> {selectedRequest.itemId}
                            </p>
                            <p>
                                <strong>Item Name:</strong> {selectedRequest.itemName}
                            </p>
                            <p>
                                <strong>User Name:</strong> {selectedRequest.userName}
                            </p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`px-2 py-1 text-sm font-semibold rounded-full ${selectedRequest.requestStatus === "APPROVED"
                                            ? "bg-green-200 text-green-800"
                                            : selectedRequest.requestStatus === "REJECTED"
                                                ? "bg-red-200 text-red-800"
                                                : "bg-yellow-200 text-yellow-800"
                                        }`}
                                >
                                    {selectedRequest.requestStatus}
                                </span>
                            </p>
                            <p>
                                <strong>Request Date:</strong> {formatDate(selectedRequest.requestDate)}
                            </p>
                            <p>
                                <strong>Message:</strong> {selectedRequest.message || "N/A"}
                            </p>
                            <p>
                                <strong>Decision By:</strong> {selectedRequest.getDecisionBy || "N/A"}
                            </p>
                            <p>
                                <strong>Decision Date:</strong> {selectedRequest.decisionDate || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default MyRequestConsole;
