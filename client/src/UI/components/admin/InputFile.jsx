export const InputFile = ({ onChange, previewUrl, uploading }) => {
    return (
        <div className="backdrop-blur-xs flex items-center justify-center flex-col my-4">
            <h1 className="text-white font-bold underline tracking-wide text-2xl">Upload Image</h1>

            <input
                onChange={onChange}
                className="text-white rounded-md p-1 m-3 cursor-pointer hover:scale-103 transition-all mx-auto border-3 border-primary/70 max-w-[80%]"
                type="file"
                name="file"
                id="file-upload"
                required
            />

            {uploading && <h3 className="text-white">Loading...</h3>}

            {previewUrl && <img className="w-125 h-auto text-white" src={previewUrl} alt="Preview" />}
        </div>
    );
};
