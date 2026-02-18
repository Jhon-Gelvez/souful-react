import { Label } from "./Label";
import { Input } from "./Input";
import { Button } from "../common/Button";
import { FiCheck } from "react-icons/fi";

export const EditForm = ({ name, price, onSubmit }) => {
    return (
        <div className="flex flex-col justify-center items-start text-primary mx-auto shadow-[0_0_3rem_rgba(0,0,0)] rounded-xl p-4 w-sm md:w-md px-9">
            <h1 className="text-3xl font-bold  my-2 self-center">Editar producto</h1>
            <Label text={"Nombre del producto"} />

            <Input
                type="text"
                name={name}
                setOnChange={() => {
                    console.log("hola mundo");
                }}
            />
            <Label text={"Descripcion del producto"} />
            <Input
                type="text"
                name={name}
                setOnChange={() => {
                    console.log("hola mundo");
                }}
            />
            <div className="flex justify-center items-center w-full mt-2">
                <Button Icon={FiCheck} onClick={onSubmit}/>
            </div>
        </div>
    );
};
