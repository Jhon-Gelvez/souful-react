// arquitecture of soulfulArt and cloudinary file in downloads

import Header from "../components/Header";
import { FilterBar } from "../components/FilterBar";
import { BottomNavbar } from "../components/BottomNavbar";
import { ProductGrid } from "../components/ProductGrid";
import { Footer } from "../components/Footer";

export function Home() {
    return (
        <>
            <Header />
            <FilterBar />
            <ProductGrid />
            <BottomNavbar />
            <Footer />
        </>
    );
}
