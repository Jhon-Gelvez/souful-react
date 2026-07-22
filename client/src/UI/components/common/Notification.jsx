import { useEffect } from "react";
import { HiX } from "react-icons/hi";

const STYLES = {
    success: "border-green-500 bg-green-500/20",
    error: "border-red-500 bg-red-500/20",
    info: "border-blue-500 bg-blue-500/20",
};

export const Notification = ({ message, type = "info", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border ${STYLES[type]}`}>
            <p className="text-white font-medium">{message}</p>
            <button onClick={onClose} className="text-white/70 hover:text-white cursor-pointer">
                <HiX className="text-xl" />
            </button>
        </div>
    );
};
