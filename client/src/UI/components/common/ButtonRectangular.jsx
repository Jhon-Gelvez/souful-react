export const ButtonRectangular = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick} className="bg-white/10 text-white px-4 py-2 rounded-lg focus:bg-primary focus:text-black focus:font-bold active:scale-95 transition-transform cursor-pointer">
            {text}
        </button>
    );
};
