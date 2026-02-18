export const Input = ({ name = "", setOnChange = null, type = "text", id = "", placeholder = "" }) => {
    return <input required onChange={setOnChange} id={id} name={name} type={type} placeholder={placeholder} className="border border-white  rounded-lg py-1 pl-1 caret-white text-white mb-2 w-full no-spinner focus:outline-none" />;
};
