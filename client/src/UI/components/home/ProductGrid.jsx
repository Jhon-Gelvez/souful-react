import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ images }) => {
    return (
        <main className="w-full p-2 ">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-4 gap-y-6 justify-items-center">
                {images.map((image) => (
                    <ProductCard key={image.id} item={image} />
                ))}
            </div>
        </main>
    );
};
