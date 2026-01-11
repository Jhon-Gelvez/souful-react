export const FilterButton = ({ Icon, text = "" }) => {
    return (
        <button className="group flex p-1 lg:mb-2 items-center justify-center gap-x-2 rounded-full border border-white/20 bg-white/5 px-4 transition-transform active:scale-95 hover:border-white focus:outline-none focus:ring-0 focus:bg-primary active:ring-0">
            {Icon && <Icon className="text-white group-focus:text-black" />}
            <span className="text-xs lg:text-base font-bold text-gray-300 group-focus:text-black select-none">
                {text}
            </span>
        </button>
    );
};