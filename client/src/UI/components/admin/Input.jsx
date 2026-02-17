export const Input = ({ name = "", setOnChange = null, type = "text" }) => {
    return <input required onChange={setOnChange} name={name} className="border border-white  rounded-lg py-1 pl-1 caret-white text-white mb-2 w-full no-spinner focus:outline-none" type={type} />;
};
