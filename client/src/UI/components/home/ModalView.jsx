import { useContext } from "react";
import { Button } from "../common/Button";
import { FaCartShopping } from "react-icons/fa6";
import { modalContext } from "../../pages/Home";
import { ProductCard } from "./ProductCard";

export const ModalView = ({ item = null }) => {
    const handleModalContainerClick = (e) => e.stopPropagation();

    const modal = useContext(modalContext);

    return (
        <div
            className="fixed inset-0 flex flex-col justify-center items-center z-100  bg-black/30 backdrop-blur-sm"
            onClick={modal.closeModal}
        >
            <div
                className="group w-[60dvw] sm:w-[30dvw] md:w-[30vw] lg:w-[20vw] flex flex-col p-1 rounded-2xl bg-background-dark  items-center gap-3 shadow-[0_15px_20px_rgb(0,0,0)] max-h-[90vh] overflow-y-auto overflow-auto"
                id="scrool-bar"
                onClick={handleModalContainerClick}
            >
                <div className="relative aspect-4/5 w-full rounded-3xl select-none shrink-0">
                    <img
                        src={`${item.image_url}`}
                        alt="alt imagen"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>

                <div className="w-full flex flex-col justify-start px-1">
                    <h3 className="text-white font-semibold block">{item.name_product}</h3>
                    <span className="text-gray-400 font-bold block">{item.alt}</span>
                </div>
                <div className="w-full flex flex-row justify-between items-center text-primary px-1 pb-2">
                    <span className="text-primary font-bold block">${item.price}</span>

                    <Button Icon={FaCartShopping} />
                </div>
            </div>
        </div>
    );
};
