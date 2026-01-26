// arquitecture of soulfulArt and cloudinary file in downloads

import { Header } from "../components/common/Header"
import { FilterBar } from "../components/home/FilterBar";
import { BottomNavbar } from "../components/home/BottomNavbar";
import { ProductGrid } from "../components/home/ProductGrid";
import { Footer } from "../components/common/Footer";

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
