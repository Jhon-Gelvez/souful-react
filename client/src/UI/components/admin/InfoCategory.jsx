import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// todo
// ancho del texto de la image_url
// fix tippy

export const InfoCategory = ({ category = null, onCopy = null, onEdit = null, onDelete = null }) => {
    return (
        <div className="min-w-[22.725rem]! md:w-40">
            <div className="py-4 flex justify-between items-center  px-2 rounded-lg border border-primary/60 mb-2">
                <div className="">
                    <p className="font-medium text-white">{category.name}</p>
                    <p className="text-sm text-white">
                        <Tippy content={"Clip para copiar"}>
                            <span onClick={() => onCopy(category.id)} className="text-xs uppercase cursor-pointer">
                                id: {category.id}
                            </span>
                        </Tippy>
                    </p>
                    <p className="text-sm text-white">Fecha creacion: {category.created_at}</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => onEdit(category)} className="text-2xl p-2 text-primary bg-white/5 rounded-full ml-2 cursor-pointer hover:bg-primary hover:text-black hover:font-bold active:scale-95 transition-transform">
                        ✎
                    </button>
                    <button onClick={() => onDelete(category.id)} className="text-2xl p-2 text-red-500 bg-white/5 rounded-full cursor-pointer hover:bg-primary hover:text-black font-bold active:scale-95 transition-transform">
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};
