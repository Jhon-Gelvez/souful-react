export const Button = ({ Icon }) => {
    return (
        <button
            className="group flex h-10 w-10 lg:w-15 items-center justify-center rounded-full 
             bg-white/10 border border-transparent cursor-pointer
             hover:bg-blue-500/20 transition-all 
             focus:outline-none hover:border-white focus:ring-0 focus:bg-primary
             active:scale-95 active:border-white"
            aria-label="Buscar"
        >
            <Icon className="drop-shadow-[0_0_1px_rgba(0,0,0,0.5)] text-zinc-800 dark:text-white group-focus:text-black transition-colors" />
        </button>
    );
};
