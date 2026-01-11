export const Button = ({ Icon }) => {
    return (
        <button
            className="group flex h-10 w-10 lg:w-15 items-center justify-center rounded-full 
             bg-white/10 border border-transparent
             hover:bg-blue-500/20 transition-all 
             focus:outline-none hover:border-white focus:ring-0
             active:scale-95 active:border-white focus:bg-primary cursor-pointer "
            aria-label="Buscar"
        >
            <Icon className="drop-shadow-[0_0_1px_rgba(0,0,0,0.5)] text-zinc-800 dark:text-white group-focus:text-black text-2xl transition-colors " />
        </button>
    );
};
