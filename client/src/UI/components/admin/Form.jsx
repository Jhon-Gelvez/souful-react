import { useState, useContext } from "react";
import { InputFile } from "./InputFile";
import { Label } from "./Label";
import { Input } from "./Input";
import { Button } from "../common/Button";
import { IoSend } from "react-icons/io5";
import { useProductForm } from "../../../hook/useProductForm";
import { categoriesContext } from "../../../context/categoriesContext";
import { Notification } from "../common/Notification.jsx";

export const Form = () => {
    const { categories } = useContext(categoriesContext);
    const [notification, setNotification] = useState(null);
    const { formData, previewUrl, uploading, handleFormChange, handleFileChange, handleSubmit } = useProductForm(categories, setNotification);
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-auto"
            >
                <InputFile
                    onChange={handleFileChange}
                    previewUrl={previewUrl}
                    uploading={uploading}
                />
                <Label
                    htmlFor="title"
                    text="Nombre del producto"
                />
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    setOnChange={handleFormChange}
                />
                <Label
                    htmlFor="description"
                    text="Descripcion del producto"
                />
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="text-white p-2 mb-3 border-white border rounded-lg w-full max-w-full resize-none block field-sizing-content min-w-0 wrap-break-word overflow-x-hidden"
                />
                <Label
                    htmlFor="price"
                    text="Precio del producto"
                />
                <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    setOnChange={handleFormChange}
                />
                <Label
                    htmlFor="category_id"
                    text="Categoria del producto"
                />
                <select
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleFormChange}
                    className="border border-white rounded-lg py-1.5 pl-1 caret-white text-white mb-2 w-full"
                >
                    <option
                        value=""
                        disabled
                        className="bg-background-dark text-white"
                    >
                        Selecciona categoria
                    </option>
                    {categories.map((cat) => (
                        <option
                            key={cat.id_category}
                            value={cat.id_category}
                            className="bg-background-dark text-white"
                        >
                            {cat.name}
                        </option>
                    ))}
                </select>

                <div className="block mx-auto mt-2">
                    <Button Icon={IoSend} />
                </div>
            </form>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </>
    );
};
