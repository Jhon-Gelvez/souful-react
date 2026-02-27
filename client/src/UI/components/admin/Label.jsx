export const Label = ({ text, htmlFor = "" }) => {
    return (
        <label className="text-white " htmlFor={htmlFor}>
            {text}
        </label>
    );
};
