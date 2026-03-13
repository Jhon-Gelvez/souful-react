// meter un main y darle grid con minimo 1 col max las que quepan usarndo repeat
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { listItems } from "../../../api/itemApi";

export const ProductGrid = () => {
    // 1. Usar useState para que React re-renderice cuando cambien los datos
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            const results = await listItems();
            setImages(results); // Actualizamos el estado
        };
        getImages();
    }, []);

    return (
        <main className="w-full p-2 ">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-4 gap-y-6 justify-items-center">
                {images.map((image) => (
                    <ProductCard key={image.id} img={image.image_url} altImg={image.alt} name={image.name_product} price={image.price} />
                ))}
            </div>
        </main>
    );
};
