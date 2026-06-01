import { Button } from "../common/Button";
import { FaCartShopping } from "react-icons/fa6";

export const ModalView = ({ item }) => {
    item = {
        product_name: "nombre",
        price: "20",
        alt: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum et nihil quibusdam explicabo consequatur neque ea velit voluptate aperiam cupiditate, quidem rerum, expedita ut reprehenderit hic consectetur laudantium repudiandae porro.",
    };
    const url = `
https://cdn.somoskudasai.com/image/a8e85459ad77a4a35bb62f68aab485a7/1920x1080/portada_bocchi-the-rock-55.jpg
    `;
    return (
        <div className="w-full flex flex-col justify-center items-center fixed z-100 inset-0 h-screen bg-black/30 backdrop-blur-sm ">
            <div className="group relative w-60 flex flex-col gap-3">
                {/* CONTENEDOR DE LA IMAGEN (Aquí agrupamos las dos capas) */}
                <div className="relative aspect-4/5 w-full">
                    {/* CAPA 1: EL RESPLANDOR (Atrás y borroso) */}
                    <div className="absolute inset-0 blur-2xl opacity-70 scale-105 -z-10 bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${url})` }} />

                    {/* CAPA 2: LA IMAGEN NÍTIDA (Encima y clara) */}
                    <div role="img" aria-label="altImg" className="relative h-full w-full overflow-hidden rounded-2xl bg-cover bg-no-repeat bg-center border border-white/10 shadow-xl" style={{ backgroundImage: `url(${url})` }}>
                        {/* Contenido extra opcional dentro de la imagen clara */}
                    </div>
                </div>

                {/* TEXTO Y PRECIO (Fuera del contenedor de imagen) */}
                <div className="px-1">
                    <h3 className="text-white font-semibold block">{item.product_name}</h3>
                    <span className="text-primary font-bold block">${item.price}</span>
                    <span className="text-primary font-bold block">${item.alt}</span>
                </div>
                <div className="flex m-0 p-0 w-[90%] h-fit justify-end">
                    <Button Icon={FaCartShopping} />
                </div>
            </div>
        </div>
    );
};
