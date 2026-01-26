import { FaHome } from "react-icons/fa";
import { Button } from "../common/Button";
import { FaWhatsapp } from "react-icons/fa";



export const BottomNavbar = () => {
    return (
        <div className="flex p-2 fixed bottom-6 right-4 lg:right-10 w-fit z-50 transition-all">
            <div
                className="flex items-center justify-center rounded-full 
                    /* Fondo adaptable con Blur */
                    bg-white/80 dark:bg-white/20 backdrop-blur-md 
                    /* Borde visible en fondo claro y oscuro */
                    border border-zinc-200 dark:border-zinc-800
                    px-3 py-2 
                    /* Sombra más natural */
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
                    {/* Asegúrate que el componente Button maneje el color del icono (ej: text-zinc-800 dark:text-white) */}
                    <Button Icon={FaHome} className="text-zinc-800 dark:text-white" />
                </a>

                {/* Separador vertical sutil */}
                <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700"></div>

                <a href="https://wa.me/tu-numero" target="_blank" className="hover:scale-110 transition-transform active:scale-95">
                    <Button Icon={FaWhatsapp} className="text-green-600 dark:text-green-400" />
                </a>
            </div>
        </div>
    );
};
