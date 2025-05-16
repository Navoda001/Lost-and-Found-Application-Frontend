import React, { useEffect, useRef, useState } from "react";
import { GetAllItems } from "../../service/ItemService";
import ItemCard from "./ItemCard";
import ItemModel from "./ItemModel";
import AddItemModal from "./AddItemModel";

const ItemConsole = () => {
    interface AllItem {
        itemId: string;
        itemName: string;
        itemDescription: string;
        location: string;
        itemStatus: string;
        reportedDate: string;
        reportedBy: string;
        imageUrl: string;
        foundBy: string;
        foundDate: string;
        claimedBy: string;
        claimedDate: string;
    }

    const [itemData, setItemData] = useState<AllItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<AllItem | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerRow, setCardsPerRow] = useState(3);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'LOST' | 'FOUND' | 'CLAIMED'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');


    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const rowsPerPage = 3;

    const loadData = async () => {
        const items = await GetAllItems();
        setItemData(items);
        console.log("Items loaded:", items);
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
        setSelectedItem(null);
    };

    const itemsPerPage = cardsPerRow * rowsPerPage;
    const totalPages = Math.ceil(itemData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = itemData.slice(startIndex, startIndex + itemsPerPage);
    const filteredItems = currentItems.filter(item => {
        const matchesStatus =
            filterStatus === 'ALL' || item.itemStatus === filterStatus;

        const matchesSearch = item.itemName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    return (
        <div className="p-6 z-0">

            <h1 className="text-[60px] font-bold font-serif uppercase text-center text-[#2c3e50] ">
                Items
            </h1>


            {/* Card Container */}
            {/*add new Item */}

            <div className="flex justify-end mb-4 mr-5">

                <AddItemModal
                    open={addModalOpen}
                    onClose={() => {
                        setAddModalOpen(false);
                        loadData(); // Refresh data after item is added
                    }}
                />

                <button onClick={() => setAddModalOpen(true)} className="px-4 py-2 bg-black text-white text-sm font-bold rounded-md hover:bg-black/70 transition-colors duration-200"
                >
                    + Add Item
                </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    {['ALL', 'LOST', 'FOUND', 'CLAIMED'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status as any)}
                            className={`px-4 py-2 text-sm font-medium rounded-md border 
          ${filterStatus === status ? 'bg-black text-white hover:text-black ' : 'bg-white text-black'} 
          hover:bg-gray-200 transition`}
                        >
                            {status}
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
                {filteredItems.map((item, index) => (
                    <div key={`${item.itemId}-${item.itemStatus}`} ref={index === 0 ? cardRef : null}>
                        <ItemCard
                            itemId={item.itemId}
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

            {/* Modal */}
            <ItemModel open={modalOpen}
                onClose={handleCloseModal}
                refreshData={loadData} // 👈 pass the function
                itemId={selectedItemId} />
        </div>
    );
};

export default ItemConsole;
