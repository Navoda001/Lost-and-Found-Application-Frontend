import React, { useEffect, useRef, useState } from "react";
import { GetAllRequestItems } from "../../service/RequestService";
import ItemCard from "./ItemCard";
import ItemRequests from "./ItemRequests";
import { useNavigate } from "react-router";

const RequestConsole = () => {
    interface AllItem {
        itemId: string;
        itemName: string;
        itemDescription: string;
        location: string;
        itemStatus: string;
        reportedDate: string;
        reportedBy: string;
        requestCount: number;
        imageUrl: string;
        foundBy: string;
        foundDate: string;
        claimedBy: string;
        claimedDate: string;
    }

    const [itemData, setItemData] = useState<AllItem[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerRow, setCardsPerRow] = useState(3);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<'FOUND' | 'CLAIMED'>('FOUND');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const rowsPerPage = 3;

    const loadData = async () => {

        try {
            const items = await GetAllRequestItems();
            setItemData(items);
            console.log("Items loaded:", items);
        } catch (error: any) {
            if (error?.response?.status === 401) {
                navigate("/unauth");
            } else {
                console.error("Failed to load items:", error);
            }
        }


    };

    useEffect(() => {
        loadData();
    }, []);

    // Detect number of cards per row based on container/card width
    useEffect(() => {
        const updateCardsPerRow = () => {
            if (containerRef.current && cardRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const cardWidth = cardRef.current.offsetWidth;
                const perRow = Math.floor(containerWidth / cardWidth);
                setCardsPerRow(perRow || 1); // fallback to at least 1
            }
        };

        updateCardsPerRow();
        window.addEventListener("resize", updateCardsPerRow);
        return () => window.removeEventListener("resize", updateCardsPerRow);
    }, []);

    const handleReadMore = (itemId: string) => {
        setSelectedItemId(itemId);
        setModalOpen(true);
    };


    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedItemId(null);
    };

    type Status = 'FOUND' | 'CLAIMED';

    const statusLabels: Record<Status, string> = {
        FOUND: 'PENDING',
        CLAIMED: 'APPROVED',
    };
    const statuses: Status[] = ['FOUND', 'CLAIMED'];

    const filteredItems = itemData.filter(item => {
        const matchesStatus =
            item.itemStatus === filterStatus;

        const matchesSearch = item.itemName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    const itemsPerPage = cardsPerRow * rowsPerPage;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-6 z-0 ">
            <h1 className="text-[60px] font-bold font-serif uppercase text-center text-[#2c3e50] ">
                Requests
            </h1>
            {/* Card Container */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">

                {/* Filter Buttons */}


                <div className="flex flex-wrap gap-2">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 text-sm font-medium rounded-md border 
                ${filterStatus === status ? 'bg-black text-white hover:text-black' : 'bg-white text-black'} 
                hover:bg-gray-200 transition`}
                        >
                            {statusLabels[status]}
                        </button>
                    ))}
                </div>



                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by item name..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-md shadow-sm w-full md:w-[50%] focus:outline-none focus:ring-2 focus:ring-black"
                />

            </div>



            <div ref={containerRef} className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentItems.map((item, index) => (
                    <div key={`${item.itemId}-${item.itemStatus}`} ref={index === 0 ? cardRef : null}>
                        <ItemCard
                            itemId={item.itemId}
                            requestCount={item.requestCount}
                            onReadMore={() => handleReadMore(item.itemId)}
                        />
                    </div>
                ))}
            </div>


            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded-md text-sm font-semibold ${currentPage === i + 1
                                ? "bg-slate-800 text-white"
                                : "bg-slate-200 text-slate-800 hover:bg-slate-400"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            <ItemRequests
                open={modalOpen}
                onClose={handleCloseModal}
                refreshData={loadData} // 👈 pass the function
                itemId={selectedItemId} />

            {/* Modal */}
            {/* <ItemModel open={modalOpen}
                onClose={handleCloseModal}
                refreshData={loadData} // 👈 pass the function
                itemId={selectedItemId} /> */}
        </div>
    );
};

export default RequestConsole;
