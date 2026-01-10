import Header from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { BottomNavbar } from "./components/BottomNavbar";
import { ProductGrid } from './components/ProductGrid'
import { Footer } from './components/Footer'

export default function App() {
    return (
        <>
            <Header />
            <FilterBar />
            <ProductGrid/>
            <BottomNavbar />
            <Footer/>
        </>
    );
}
