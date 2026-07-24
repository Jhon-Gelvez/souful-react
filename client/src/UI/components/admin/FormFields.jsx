import React from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import { Button } from "../common/Button";
import { FiCheck } from "react-icons/fi";

export const FormFields = ({ children, title = "", InputSettings, onSubmit, onChange }) => {
    return (
        <div className="flex flex-col justify-center items-start text-primary mx-auto shadow-[0_0_3rem_rgba(0,0,0)] rounded-xl p-4 w-sm md:w-md px-9 m-9">
            <h1 className="text-3xl font-bold my-2 self-center">{title}</h1>
            {InputSettings.map((input, i) => (
                <React.Fragment key={i}>
                    <Label htmlFor={input.id} text={input.textLabel || input.name} />
                    <Input value={input.value || ""} setOnChange={onChange} {...input} />
                </React.Fragment>
            ))}
            {children}
            <div className="flex justify-center items-center w-full mt-2">
                <Button Icon={FiCheck} onClick={onSubmit} />
            </div>
        </div>
    );
};
