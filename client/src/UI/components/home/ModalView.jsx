import { useContext } from "react";
import { modalContext } from "../../../context/modalContext";

export const ModalView = ({ children }) => {
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
                {children}
            </div>
        </div>
    );
};
