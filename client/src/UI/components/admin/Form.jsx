// todo dejar solo lo relacionado con el form sacar jsx general

import { useState, useContext } from "react";
import { InputFile } from "./InputFile";
import { IoSend } from "react-icons/io5";
import { Label } from "./Label";
import { Input } from "./Input";
import { Button } from "../common/Button";
import { handleForm } from "../../../hook/handleForm";
import { categoriesContext } from "../../../context/categoriesContext";
import { Notification } from "../common/Notification.jsx";

export const Form = () => {
    const { categories } = useContext(categoriesContext);
    const [notification, setNotification] = useState(null);
    const { handleSubmit, handleFileChange, handleFormChange } = handleForm(categories, setNotification);
    return (
        <main className="flex flex-col justify-center items-center w-full text-primary mx-auto">
            <div className="rounded-xl pb-2 px-3 sm:p-8 sm:pb-4 shadow-[0_0_3rem_rgba(0,0,0)] shadow-black bg-background-dark">
                <h1 className="text-3xl font-bold text-center my-2">Pagina para el Admin</h1>
                <p className="text-xl text-center my-3">sube aca tus imagenes</p>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-auto"
                >
                    <InputFile setOnChange={handleFileChange} />
                    <Label text="Nombre del producto" />
                    <Input
                        name="title"
                        setOnChange={handleFormChange}
                    />
                    <Label text="Descripcion del producto" />
                    <textarea
                        name="description"
                        onChange={handleFormChange}
                        className="text-white p-2 mb-3 border-white border rounded-lg w-full max-w-89.5 resize-none block field-sizing-content"
                    />
                    <Label text="Precio del producto" />
                    <Input
                        name="price"
                        type="number"
                        setOnChange={handleFormChange}
                    />
                    <Label text="Categoria del producto" />
                    <select
                        name="category_id"
                        defaultValue=""
                        onChange={handleFormChange}
                        className="border border-white  rounded-lg py-1.5 pl-1 caret-white text-white mb-2 w-full"
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
            </div>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </main>
    );
};
