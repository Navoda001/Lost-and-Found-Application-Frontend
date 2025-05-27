import React, { useState, useEffect } from "react";
import { GetAllRequestsByItemId } from "../../service/RequestService";
import RequestAction from "./RequestAction";

interface ItemRequestProps {
  open: boolean;
  onClose: () => void;
  refreshData: () => Promise<void>;
  itemId: string | null;
}

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
  decisionEmail:string;
  getDecisionBy:string;
}


const TABLE_HEAD = ["Request Id", "User Id", "User Name", "Status", "Request Date", ""];

const ItemRequests: React.FC<ItemRequestProps> = ({
  open,
  onClose,
  itemId,
  refreshData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");
  const [requestData, setRequestData] = useState<Request[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<Request | null>(null);

  const getRequestData = async () => {
    if (!itemId) return;
    const response = await GetAllRequestsByItemId(itemId);
    setRequestData(response);
    console.log("Request data:", response);
  };

  useEffect(() => {
    if (open) {
      getRequestData();
    }
  }, [itemId, open]);

  const refreshAllData = async () => {
    await refreshData();      // Calls main parent's loadData()
    await getRequestData();   // Calls sub parent's local data loader
  };


  const filteredRows = requestData.filter((req) => {
    const matchesStatus = filterStatus === "ALL" || req.requestStatus === filterStatus;
    const matchesSearch = req.userName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!open) return null;

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

  const handleAction = (request: Request) => {
    setSelectedRow(request);
    setModalOpen(true);
  }
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUserId(null);
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/60 backdrop-blur-sm overflow-auto px-4 py-8"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-screen w-full max-w-6xl bg-white rounded-xl shadow-2xl p-6 md:p-8 transition-transform duration-300"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Request List</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 font-bold text-2xl hover:text-red-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
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
            placeholder="Search by user name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border  border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {requestData.length > 0 && (
          <div className="mb-6 text-start space-y-1">
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              Item ID: <span className="font-normal text-gray-700">{requestData[0].itemId}</span>
            </p>
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              Item Name: <span className="font-normal text-gray-700">{requestData[0].itemName}</span>
            </p>
          </div>
        )}




        {/* Table */}
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
              {filteredRows.map((row, index) => (
                <tr key={index} className="border-b text-left hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-md text-gray-800">{row.requestId}</td>
                  <td className="px-4 py-3 font-medium text-md text-gray-800">{row.userId}</td>
                  <td className="px-4 py-3 font-medium text-md text-gray-800">
                    {row.userName}
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
                      {row.requestStatus === "pending" ? "Action" : "View"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          <RequestAction
            openRequest={modalOpen}
            request={selectedRow}
            onClose={handleCloseModal}
            refreshData={refreshAllData}
          />
        </div>
      </div>
    </div>

  );
};

export default ItemRequests;
