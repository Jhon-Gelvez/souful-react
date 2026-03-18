// arquitecture of soulfulArt and cloudinary file in downloads
import { useState, useEffect } from "react";
import { listItems } from "../../api/itemApi";

import { Header } from "../components/common/Header";
import { FilterBar } from "../components/home/FilterBar";
import { BottomNavbar } from "../components/home/BottomNavbar";
import { ProductGrid } from "../components/home/ProductGrid";
import { Footer } from "../components/common/Footer";

/*
home hace la peticion
se la pasa a grid product y renderiza
en header se envia a home el texto por el cual ordenar
y home ordena esos datos y se vuelve a parar a product grid
*/

export function Home() {
    // 1. Usar useState para que React re-renderice cuando cambien los datos
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getImages = async () => {
            const results = await listItems();
            setImages(results); // Actualizamos el estado
        };
        getImages();
    }, []);

    // useEffect(() => {
    //     sortItems();
    // }, [searchTerm]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    // Calculamos la lista ordenada en cada renderizado
    const sortItems = [...images].sort((a, b) => {
        if (!searchTerm) return 0;

        // Extraemos los nombres de forma segura
        const nameA = (a.name_product || "").toLowerCase();
        const nameB = (b.name_product || "").toLowerCase();

        const matchesA = nameA.includes(searchTerm);
        const matchesB = nameB.includes(searchTerm);

        // Lógica de Prioridad:
        // Si A coincide y B no, A sube (-1)
        if (matchesA && !matchesB) return -1;
        // Si B coincide y A no, B sube (1)
        if (!matchesA && matchesB) return 1;

        return 0;
    });
    return (
        <>
            <Header onSearch={handleSearch} />
            <FilterBar />
            <ProductGrid images={sortItems} />
            <BottomNavbar />
            <Footer />
        </>
    );
}
