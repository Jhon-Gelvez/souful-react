import { FaHome } from "react-icons/fa";
import { Button } from "../common/Button";
import { FaWhatsapp } from "react-icons/fa";

const PHONE_NUMBER = "573183328721";

export const BottomNavbar = () => {
    const handleWhatsApp = () => {
        const mensaje = "Hola, estoy interesado en sus productos. ¿Podrían darme más información?";
        window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(mensaje)}`, "_blank");
    };

    return (
        <div className="flex p-2 fixed bottom-6 right-4 lg:right-10 w-fit z-50 transition-all">
            <div
                className="flex items-center justify-center rounded-full 
                    bg-white/80 dark:bg-white/20 backdrop-blur-md 
                    border border-zinc-200 dark:border-zinc-800
                    px-3 py-2 
                    shadow-lg shadow-black/10 dark:shadow-black/40 
                    gap-3"
            >
                <a
                    href="#inicio"
                    className="hover:scale-110 transition-transform active:scale-95"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    <Button
                        Icon={FaHome}
                        className="text-zinc-800 dark:text-white"
                    />
                </a>

                <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700"></div>

                <button
                    onClick={handleWhatsApp}
                    className="hover:scale-110 transition-transform active:scale-95 cursor-pointer"
                >
                    <Button
                        Icon={FaWhatsapp}
                        className="text-green-600 dark:text-green-400"
                    />
                </button>
            </div>
        </div>
    );
};
