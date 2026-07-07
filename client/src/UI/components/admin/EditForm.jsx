// todo centralizar el create form y el edit form, son lo mismo
// fix el children se renderiza 3 veces

import React from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import { Button } from "../common/Button";
import { FiCheck } from "react-icons/fi";

export const EditForm = ({ children, label = "", InputSettings, onSubmit, onChange }) => {
    return (
        <div className="flex flex-col justify-center items-start text-primary mx-auto shadow-[0_0_3rem_rgba(0,0,0)] rounded-xl p-4 w-sm md:w-md px-9">
            <h1 className="text-3xl font-bold  my-2 self-center">{label || "Editar producto"}</h1>
            {InputSettings.map((input, i) => (
                // Importante: El Fragment <></> necesita una 'key' si está dentro de un map
                <React.Fragment key={i}>
                    <Label
                        htmlFor={input.id}
                        text={input.textLabel || input.name}
                    />
                    <Input
                        setOnChange={onChange} // Pasamos la referencia de la función directamente
                        {...input} // <--- ¡MAGIA! Esto pasa id, name, placeholder, type, etc. de un solo golpe
                    />
                </React.Fragment>
            ))}
            {children}
            <div className="flex justify-center items-center w-full mt-2">
                <Button
                    Icon={FiCheck}
                    onClick={onSubmit}
                />
            </div>
        </div>
    );
};
