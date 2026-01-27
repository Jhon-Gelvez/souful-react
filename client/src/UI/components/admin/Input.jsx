export const Input = ({name="", setOonChange=null}) => {
    return <input required onChange={setOonChange} name={name} className="border border-white  rounded-lg py-1 pl-1 caret-white text-white mb-2 w-full" type="text" />;
};
