import { useState, useEffect } from "react";
import { productRecordsApi } from "../../api/productRecordsApi.js";
import { categoriesApi } from "../../api/categoriesApi.js";
import { Header } from "../components/common/Header.jsx";
import { FilterBar } from "../components/home/FilterBar.jsx";
import { BottomNavbar } from "../components/home/BottomNavbar.jsx";
import { ProductGrid } from "../components/home/ProductGrid.jsx";
import { Footer } from "../components/common/Footer.jsx";
import { ModalView } from "../components/home/ModalView.jsx";
import { ModalProduct } from "../components/home/ModalProduct.jsx";
import { ModalShopping } from "../components/home/ModalShopping.jsx";
import { handleModal } from "../../hook/handleModal.js";
import { modalProductContext } from "../../context/modalProductContext.js";
import { modalShoppingContext } from "../../context/modalShoppingContext.js";
import { categoryIconContext } from "../../context/categoryIconContext.js";
import { categoryIconMap, defaultIcon } from "../../data/categoryIcons.js";

export function Home() {
    const [records, setRecords] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(null);

    const modalProduct = handleModal(false);
    const { isOpenModal: isOpenModalProduct, openModal: openModalProduct, closeModal: closeModalProduct, selectedItem: selectedProduct } = modalProduct;

    const modalShopping = handleModal(false);
    const { isOpenModal: isOpenModalShopping, openModal: openModalShopping, closeModal: closeModalShopping, selectedItem: selectedShopping } = modalShopping;

    const getRecords = async () => {
        const results = await productRecordsApi.get();
        setRecords(results);
    };

    const getCategories = async () => {
        const results = await categoriesApi.get();
        setCategories(results);
    };

    useEffect(() => {
        getRecords();
        getCategories();
    }, []);

    const getCategoryIcon = (categoryId, className = "") => {
        if (!categoryId) return defaultIcon;
        const category = categories.find((c) => c.id_category === categoryId);
        if (!category) return defaultIcon;
        const Icon = categoryIconMap[category.name.toLowerCase()] || defaultIcon;
        return Icon;
    };

    const getCategoryName = (categoryId) => {
        if (!categoryId) return null;
        const category = categories.find((c) => c.id_category === categoryId);
        return category ? category.name : null;
    };

    const handleCategoryFilter = (categoryName) => {
        setCategoryFilter((prev) => (prev === categoryName ? null : categoryName));
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const sortItems = [...records].sort((a, b) => {
        if (categoryFilter) {
            const nameA = getCategoryName(a.id_category);
            const nameB = getCategoryName(b.id_category);
            const matchesA = nameA && nameA.toLowerCase() === categoryFilter.toLowerCase();
            const matchesB = nameB && nameB.toLowerCase() === categoryFilter.toLowerCase();
            if (matchesA && !matchesB) return -1;
            if (!matchesA && matchesB) return 1;
        }

        if (searchTerm) {
            const nameA = (a.product_name || "").toLowerCase();
            const nameB = (b.product_name || "").toLowerCase();
            const matchesA = nameA.includes(searchTerm);
            const matchesB = nameB.includes(searchTerm);
            if (matchesA && !matchesB) return -1;
            if (!matchesA && matchesB) return 1;
        }

        return 0;
    });

    const categoryIconValue = { categories, getCategoryIcon, getCategoryName, categoryFilter, handleCategoryFilter };

    return (
        <categoryIconContext.Provider value={categoryIconValue}>
            <modalProductContext.Provider value={modalProduct}>
                <modalShoppingContext.Provider value={modalShopping}>
                    <Header onSearch={handleSearch} />
                    <FilterBar />
                    <ProductGrid images={sortItems} />
                    <BottomNavbar />
                    <Footer />
                    {isOpenModalProduct && (
                        <ModalView onClose={closeModalProduct}>
                            <ModalProduct />
                        </ModalView>
                    )}
                    {isOpenModalShopping && (
                        <ModalView onClose={closeModalShopping}>
                            <ModalShopping
                                item={selectedShopping}
                                onClose={closeModalShopping}
                            />
                        </ModalView>
                    )}
                </modalShoppingContext.Provider>
            </modalProductContext.Provider>
        </categoryIconContext.Provider>
    );
}
