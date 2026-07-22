import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// todo
// ancho del texto de la image_url
// fix tippy

export const InfoItem = ({ id_record = null, name = "", price = "", public_id = "", image_url = "", singleItem = null, onCopy = null, onEdit = null, onDelete = null }) => {
    return (
        <div className="w-full">
            <div className="py-4 flex justify-between items-center  px-2 rounded-lg border border-primary/60 mb-2">
                <div>
                    <p className="font-medium text-white">{name}</p>
                    <p className="text-sm text-white">
                        ${price}
                        <Tippy content={"Clip para copiar"}>
                            <span
                                onClick={() => onCopy(id_record)}
                                className="text-xs uppercase ml-2 cursor-pointer"
                            >
                                id: {id_record}
                            </span>
                        </Tippy>
                        <Tippy content={"Clip para copiar"}>
                            <span
                                onClick={() => onCopy(public_id)}
                                className="text-xs uppercase ml-2 cursor-pointer"
                            >
                                {public_id}
                            </span>
                        </Tippy>
                    </p>
                    <Tippy content={"Clip para copiar"}>
                        <span
                            onClick={() => onCopy(image_url)}
                            className="text-primary underline cursor-pointer truncate block max-w-62.5 mt-1"
                        >
                            {image_url}
                        </span>
                    </Tippy>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => onEdit(singleItem)}
                        className="text-2xl p-2 text-primary bg-white/5 rounded-full ml-2 cursor-pointer hover:bg-primary hover:text-black hover:font-bold active:scale-95 transition-transform"
                    >
                        ✎
                    </button>
                    <button
                        onClick={() => onDelete(id_record)}
                        className="text-2xl p-2 text-red-500 bg-white/5 rounded-full cursor-pointer hover:bg-primary hover:text-black font-bold active:scale-95 transition-transform"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};
