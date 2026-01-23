import { Button } from './Button'
import { FaCartShopping } from "react-icons/fa6";

export const ProductCard = ({ img, altImg, name, price }) => {
    return (
        <div className="group flex w-60 flex-col gap-3">
            {/* Contenedor de Imagen como Background */}
            <div role="img" aria-label={altImg} className="relative aspect-4/5 overflow-hidden rounded-2xl bg-gray-800 bg-cover bg-center " style={{ backgroundImage: `url(${img})` }}></div>

            <div className="flex items-center justify-between px-1">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 text-lg tracking-wide">{name}</h3>
                    <p className="font-bold text-primary">${price}</p>
                </div>

            <Button Icon={FaCartShopping
                
            }/>              
            </div>
        </div>
    );
};
