// fix icon no se renderiza

import { useContext } from "react";
import { Button } from "../common/Button";
import { CategoryIcon } from "../common/CategoryIcon";
import { FaCartShopping } from "react-icons/fa6";
import { modalProductContext } from "../../../context/modalProductContext.js";
import { modalShoppingContext } from "../../../context/modalShoppingContext.js";
import { categoryIconContext } from "../../../context/categoryIconContext.js";

export const ProductCard = ({ item }) => {
    const { getCategoryIcon } = useContext(categoryIconContext);
    const { openModal: openProductModal } = useContext(modalProductContext);
    const { openModal: openShoppingModal } = useContext(modalShoppingContext);

    return (
        <div className="group flex w-60 flex-col gap-3">
            <div
                className="relative aspect-4/5 overflow-hidden rounded-2xl bg-gray-800"
                onClick={() => openProductModal(item)}
            >
                <img
                    src={item.image_url}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex items-center justify-between px-1">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 text-lg tracking-wide">{item.name_product}</h3>
                    <CategoryIcon icon={getCategoryIcon(item.category_id)} />
                    <p className="font-bold text-primary">${item.price}</p>
                </div>
                <Button
                    onClick={() => openShoppingModal(item)}
                    Icon={FaCartShopping}
                />
            </div>
        </div>
    );
};
