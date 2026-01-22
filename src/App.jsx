// arquitecture of soulfulArt and cloudinary file in downloads

import Header from "./UI/components/Header";
import { FilterBar } from "./UI/components/FilterBar";
import { BottomNavbar } from "./UI/components/BottomNavbar";
import { ProductGrid } from "./UI/components/ProductGrid";
import { Footer } from "./UI/components/Footer";
import { Cloudinary } from "./feactures/services/cloudinary/Cloudinay";

export default function App() {
    return (
        <>
            <Header />
            <FilterBar />
            <ProductGrid />
            <BottomNavbar />
            <Cloudinary />
            <Footer />
        </>
    );
}
