export const ModalShopping = ({ item, onClose }) => {
    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center justify-between px-3 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    <h3 className="text-sm font-semibold text-white">Termina tu proceso de compra</h3>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col gap-3 px-3 py-3">
                <p className="text-xs text-gray-400 leading-relaxed">Estás a punto de comunicarte con un asesor de ventas para finalizar tu compra.</p>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 shrink-0">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            />
                        </svg>
                    </div>
                    <div className="min-w-0 grow">
                        <p className="font-semibold text-white text-sm truncate">{item?.name_product || "Producto"}</p>
                        <p className="text-primary font-bold text-sm">${item?.price || "0.00"}</p>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Mensaje Adicional (Opcional)</label>
                    <textarea
                        rows="2"
                        className="w-full text-sm border border-white/20 rounded-lg p-2.5 bg-background-dark text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none no-scrollbar min-h-20 max-h-37.5"
                        style={{ fieldSizing: "content" }}
                        placeholder="Ej: ¿Tienen envío gratis a mi dirección?"
                    ></textarea>
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 px-3 py-3 border-t border-white/10">
                <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={onClose}
                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-semibold px-4 py-2 text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                    <svg
                        className="w-3.5 h-3.5 fill-current"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.434 2.493 1.157 3.449l-.756 2.76 2.825-.741a5.722 5.722 0 002.542.602h.002c3.182 0 5.767-2.587 5.768-5.766.002-3.18-2.585-5.77-5.77-5.77zm3.435 8.163c-.15.424-.766.804-1.077.854-.268.044-.616.077-1.748-.393-1.446-.6-2.353-2.072-2.425-2.17-.07-.095-.573-.762-.573-1.455 0-.693.363-1.034.492-1.173.129-.139.283-.174.377-.174h.268c.085 0 .2.033.313.303.116.283.399.972.434 1.044.035.071.059.155.012.25-.047.094-.07.206-.141.289-.071.083-.149.186-.212.25-.07.071-.144.148-.061.289.082.141.367.606.787.981.542.483 1 .632 1.141.703.141.071.224.059.307-.035.083-.094.354-.413.448-.553.094-.141.189-.118.318-.07.129.047.825.389.967.46.141.07.235.106.27.166.036.059.036.342-.113.766zM12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.102 1.511 5.842L0 24l6.326-1.488C7.944 23.336 9.919 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.84c-1.896 0-3.753-.51-5.371-1.472l-.385-.229-3.753.882.898-3.279-.25-.397A9.8 9.8 0 012.16 12c0-5.424 4.416-9.84 9.84-9.84s9.84 4.416 9.84 9.84-4.416 9.84-9.84 9.84z" />
                    </svg>
                    Confirmar en WhatsApp
                </button>
            </div>
        </div>
    );
};
