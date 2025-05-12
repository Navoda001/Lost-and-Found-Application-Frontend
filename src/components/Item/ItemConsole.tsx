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

    return (
        <div className="p-6">
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

            <div ref={containerRef} className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {currentItems.map((item, index) => (
                    <div key={item.itemId} ref={index === 0 ? cardRef : null}>
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
                onClose={() => {
                    handleCloseModal();
                    loadData(); // Refresh data after item is added
                }}
                itemId={selectedItemId} />
        </div>
    );
};

export default ItemConsole;
