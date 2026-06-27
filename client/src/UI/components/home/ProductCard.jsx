// todo que todo el componente tome el click y lo abra pero si le dan al btn de comprar se abre la modal de redireccion
import { useContext, useState } from "react";
import { Button } from "../common/Button";
import { FaCartShopping } from "react-icons/fa6";
import { modalContext } from "../../pages/Home";

export const ProductCard = ({ item }) => {
    const modal = useContext(modalContext);
    const [buy, setBuy] = useState(false);

    const onShoppingCard = () => {
        setBuy(true);
    };

    const handleClick = () => {
        onShoppingCard();
    };

    return (
        <div className="group flex w-60 flex-col gap-3">
            {/* Contenedor de Imagen como Background */}
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-gray-800" onClick={() => modal.openModal(item)}>
                <img src={item.image_url} alt={item.alt} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-between px-1">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 text-lg tracking-wide">{item.name_product}</h3>
                    <p className="font-bold text-primary">${item.price}</p>
                </div>
                <Button onClick={handleClick} Icon={FaCartShopping} />
            </div>
        </div>
    );
};
