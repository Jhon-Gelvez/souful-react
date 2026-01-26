export const Button = ({ Icon}) => {
    return (
        <button
            className={`group flex h-12 w-12 items-center justify-center  
             bg-white/10 border border-transparent cursor-pointer rounded-full
             hover:bg-blue-500/20 transition-all 
             focus:outline-none hover:border-white focus:ring-0 focus:bg-primary
             active:scale-95 active:border-white`}
            
        >
            <Icon className="drop-shadow-[0_0_1px_rgba(0,0,0,0.5)] text-zinc-800 dark:text-white group-focus:text-black transition-colors text-3xl lg:text-2xl" />
        </button>
    );
};
