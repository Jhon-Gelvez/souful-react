// arquitecture of soulfulArt and cloudinary file in downloads
import { useState, useEffect } from "react";
import { listItems } from "../../api/itemApi";
import { listCategories } from "../../api/categoryApi";
import { Header } from "../components/common/Header";
import { FilterBar } from "../components/home/FilterBar";
import { BottomNavbar } from "../components/home/BottomNavbar";
import { ProductGrid } from "../components/home/ProductGrid";
import { Footer } from "../components/common/Footer";
import { ModalView } from "../components/home/ModalView";
import { ModalProduct } from "../components/home/ModalProduct";
import { ModalShopping } from "../components/home/ModalShopping";
import { handleModal } from "../../hook/handleModal";
import { modalProductContext } from "../../context/modalProductContext";
import { modalShoppingContext } from "../../context/modalShoppingContext";
import { categoryIconContext } from "../../context/categoryIconContext";
import { categoryIconMap, defaultIcon } from "../../data/categoryIcons";

/*
home hace la peticion
se la pasa a grid product y renderiza
en header se envia a home el texto por el cual ordenar
y home ordena esos datos y se vuelve a parar a product grid
*/

export function Home() {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(null);

    const modalProduct = handleModal(false);
    const { isOpenModal: isOpenModalProduct, openModal: openModalProduct, closeModal: closeModalProduct, selectedItem: selectedProduct } = modalProduct;

    const modalShopping = handleModal(false);
    const { isOpenModal: isOpenModalShopping, openModal: openModalShopping, closeModal: closeModalShopping, selectedItem: selectedShopping } = modalShopping;

    useEffect(() => {
        const getImages = async () => {
            const results = await listItems();
            setImages(results);
        };
        getImages();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const results = await listCategories();
            setCategories(results);
        };
        getCategories();
    }, []);

    const getCategoryIcon = (categoryId, className = "") => {
        if (!categoryId) return defaultIcon;
        const category = categories.find((c) => c.id === categoryId);
        if (!category) return defaultIcon;
        const Icon = categoryIconMap[category.name.toLowerCase()] || defaultIcon;
        return Icon;
    };

    const getCategoryName = (categoryId) => {
        if (!categoryId) return null;
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.name : null;
    };

    const handleCategoryFilter = (categoryName) => {
        setCategoryFilter((prev) => (prev === categoryName ? null : categoryName));
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const sortItems = [...images].sort((a, b) => {
        if (categoryFilter) {
            const nameA = getCategoryName(a.category_id);
            const nameB = getCategoryName(b.category_id);
            const matchesA = nameA && nameA.toLowerCase() === categoryFilter.toLowerCase();
            const matchesB = nameB && nameB.toLowerCase() === categoryFilter.toLowerCase();
            if (matchesA && !matchesB) return -1;
            if (!matchesA && matchesB) return 1;
        }

        if (searchTerm) {
            const nameA = (a.name_product || "").toLowerCase();
            const nameB = (b.name_product || "").toLowerCase();
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
