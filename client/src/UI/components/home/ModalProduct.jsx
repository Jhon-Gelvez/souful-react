import { useContext } from "react";
import { Button } from "../common/Button";
import { FaCartShopping } from "react-icons/fa6";
import { modalProductContext } from "../../../context/modalProductContext";
import { modalShoppingContext } from "../../../context/modalShoppingContext";

export const ModalProduct = () => {
    const { selectedItem, closeModal: closeProductModal } = useContext(modalProductContext);
    const { openModal: openShoppingModal } = useContext(modalShoppingContext);

    return (
        <>
            <div className="relative aspect-4/5 w-full rounded-3xl select-none shrink-0">
                <img
                    src={selectedItem.image_url}
                    alt={selectedItem.alt}
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>

            <div className="w-full flex flex-col justify-start px-1">
                <h3 className="text-white font-semibold block">{selectedItem.name_product}</h3>
                <span className="text-gray-400 font-bold block">{selectedItem.alt}</span>
            </div>
            <div className="w-full flex flex-row justify-between items-center text-primary px-1 pb-2">
                <span className="text-primary font-bold block">${selectedItem.price}</span>

                <Button onClick={() => { closeProductModal(); openShoppingModal(selectedItem); }} Icon={FaCartShopping} />
            </div>
        </>
    );
};
