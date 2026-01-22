// meter un main y darle grid con minimo 1 col max las que quepan usarndo repeat
import { ProductCard } from "./ProductCard";
import img2 from "../../../public/assets/portada-tejidos.jpg";
import img from "../../../public/assets/portada-bisuteria.jpg";

export const ProductGrid = () => {
    return (
        <main className="w-full p-2 ">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-4 gap-y-6 justify-items-center">
                <ProductCard img={img} altImg={"manilla de loro hecha en telar"} name={"Manilla de loro"} price={"15.000"} />
                <ProductCard img={img2} altImg={"manilla de loro hecha en telar"} name={"Manilla de loro"} price={"15.000"} />
                <ProductCard img={img} altImg={"manilla de loro hecha en telar"} name={"Manilla de loro"} price={"15.000"} />
                <ProductCard img={img} altImg={"manilla de loro hecha en telar"} name={"Manilla de loro"} price={"15.000"} />
                <ProductCard img={img2} altImg={"manilla de loro hecha en telar"} name={"Manilla de loro"} price={"15.000"} />
                <ProductCard img={img} altImg={"manilla de loro hecha en telar"} name={"Manilla de loro"} price={"15.000"} />
                <ProductCard img={img} altImg={"manilla de loro hecha en telar"} name={"Manilla de loro"} price={"15.000"} />
                <ProductCard img={img} altImg={"manilla de loro hecha en telar"} name={"Manilla de loro"} price={"15.000"} />
                <ProductCard img={img2} altImg={"manilla de loro hecha en telar"} name={"Manilla de loro"} price={"15.000"} />
                <ProductCard img={img} altImg={"manilla de loro hecha en telar"} name={"Manilla de loro"} price={"15.000"} />
            </div>
        </main>
    );
};
