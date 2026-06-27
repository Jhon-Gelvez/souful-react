// todo limpir el form al terminar una request exitosa

import { useState, useEffect } from "react";
import { InputFile } from "./InputFile";
import { IoSend } from "react-icons/io5";
import { Label } from "./Label";
import { Input } from "./Input";
import { Button } from "../common/Button";
import { handleForm } from "../../../hook/handleForm";
import { listCategories } from "../../../api/categoryApi";

export const Form = () => {
    const { handleSubmit, handleFileChange, handleFormChange } = handleForm();
    // 2. Definir el estado para las categorías
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // 2. Definimos una función async dentro del useEffect
        const fetchCategories = async () => {
            try {
                const data = await listCategories();
                // 3. Guardamos los datos reales en el estado
                setCategories(data);
            } catch (error) {
                console.error("Error al traer categorías:", error);
            }
        };

        fetchCategories();
    }, []);
    return (
        <main className="flex flex-col justify-center items-center w-full text-primary mx-auto">
            <div className="rounded-xl pb-2 px-3 sm:p-8 sm:pb-4 shadow-[0_0_3rem_rgba(0,0,0)] shadow-black bg-background-dark">
                <h1 className="text-3xl font-bold text-center my-2">Pagina para el Admin</h1>
                <p className="text-xl text-center my-3">sube aca tus imagenes</p>
                <form onSubmit={handleSubmit} className="flex flex-col w-auto">
                    <InputFile setOnChange={handleFileChange} />
                    <Label text="Nombre del producto" />
                    <Input name="title" setOnChange={handleFormChange} />
                    <Label text="Descripcion del producto" />
                    <textarea name="description" onChange={handleFormChange} className="text-white p-2 mb-3 border-white border rounded-lg w-full max-w-89.5 resize-none block field-sizing-content" />
                    <Label text="Precio del producto" />
                    <Input name="price" type="number" setOnChange={handleFormChange} />
                    <Label text="Categoria del producto" />
                    <select name="category_id" defaultValue="" onChange={handleFormChange} className="border border-white  rounded-lg py-1.5 pl-1 caret-white text-white mb-2 w-full">
                        <option value="" disabled className="bg-background-dark text-white">
                            Selecciona categoría
                        </option>
                        {categories.map((cat) => (
                            // El value es el ID para la DB, el texto es el nombre para el usuario
                            <option key={cat.id} value={cat.id} className="bg-background-dark text-white">
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <div className="block mx-auto mt-2">
                        <Button Icon={IoSend} />
                    </div>
                </form>
            </div>
        </main>
    );
};
