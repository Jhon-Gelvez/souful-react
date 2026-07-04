// todo cambiar el icono por una x que limpie el texto escrito y deshaga la busqueda
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Button } from "./Button";
import logo from "../../../asset/soulful_logo.jpeg";
import { Input } from "./../admin/Input";

export function Header({ onSearch = null }) {
    const [search, setSearch] = useState(false);
    const [term, setTerm] = useState("");
    const handleSearch = () => {
        setSearch(true);
    };

    const handleClick = () => {
        handleSearch();
        onSearch(term.toLowerCase().trim());
    };
    return (
        <header
            id="inicio"
            className="flex items-center justify-between bg-transparent px-4 py-3"
        >
            <div>
                <h1 className="text-2xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">SoulfulArt</h1>
                <p className="text-xs lg:text-sm font-medium text-white/80">Arte hecho con el alma</p>
            </div>
            <div
                className="
            w-fit mr-auto ml-4 border border-white/40 rounded-full"
            >
                <img
                    src={logo}
                    alt=""
                    className="w-14 lg:w-18 rounded-full p-0"
                />
            </div>
            <div className="mr-2 mt-2">
                {search && (
                    <Input
                        setOnChange={(e) => {
                            const value = e.target.value;
                            setTerm(value);
                            onSearch(value.toLowerCase().trim());
                        }}
                    />
                )}
            </div>
            <div className="flex items-center gap-3">
                <Button
                    Icon={HiSearch}
                    onClick={handleClick}
                />
            </div>
        </header>
    );
}
