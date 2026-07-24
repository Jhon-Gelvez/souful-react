import { useState } from "react";
import { ButtonRectangular } from "../common/ButtonRectangular";

export const SearchForm = ({ textLabel, onSearch, onListAll, create = false, onCreate = null }) => {
    const [searchId, setSearchId] = useState("");

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div className="w-full md:w-1/2 space-y-2">
                <label htmlFor="search-id" className="text-md font-bold text-white underline whitespace-nowrap">{textLabel}</label>
                <div className="flex gap-2 mt-1.5">
                    <input id="search-id" name="id" type="text" className="flex-1 px-4 py-2 border border-primary rounded-lg  focus:ring-2    outline-none" placeholder="ID del producto..." value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <ButtonRectangular
                        text={"Buscar"}
                        handleClick={() => {
                            onSearch(searchId);
                            setSearchId("");
                        }}
                    />
                </div>
                <div className="flex gap-2 mt-1.5 whitespace-nowrap">
                    <ButtonRectangular
                        text={"Listar Todos"}
                        handleClick={() => {
                            onListAll();
                        }}
                    />
                    {create && (
                        <ButtonRectangular
                            text={"Crear categoria"}
                            handleClick={() => {
                                onCreate();
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
