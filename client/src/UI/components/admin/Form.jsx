import { InputFile } from "./InputFile";
import { IoSend } from "react-icons/io5";
import { Label } from "./Label";
import { Input } from "./Input";
import { Button } from "../common/Button";
import { HandleForm } from "../../../hook/HandleForm";

export const Form = () => {
    const { handleSubmit, handleFileChange, handleFormChange } = HandleForm();
    return (
        <main className="flex flex-col justify-center items-center min-w-[50dvw]! w-[80%] text-primary mx-auto">
            <div className="rounded-xl px-3 sm:p-8 sm:pb-2 shadow-[0_0_3rem_rgba(0,0,0)] shadow-black bg-background-dark">
                <h1 className="text-3xl font-bold text-center my-2">Pagina para el Admin</h1>
                <p className="text-xl text-center my-3">sube aca tus imagenes</p>
                <form onSubmit={HandleForm} className="flex flex-col w-auto">
                    <InputFile />
                    <Label text="Nombre del producto" />
                    <Input name="title" />
                    <Label text="Descripcion del producto" />
                    <textarea name="description" className="text-white p-2 mb-3 border-white border rounded-lg w-full max-w-89.5 resize-none block field-sizing-content" />
                    <Label text="Precio del producto" />
                    <Input name="price" />
                    <Label text="Categoria del producto" />
                    <Input name="category" />
                    <div className="block mx-auto mt-2">
                        <Button Icon={IoSend} />
                    </div>
                </form>
                <div className="w-4 h-3"></div>
            </div>
        </main>
    );
};
