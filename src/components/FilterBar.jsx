import { FilterButton } from "./FilterButton";
import { GiButterfly } from "react-icons/gi";
import { LuBaby } from "react-icons/lu";
import { SiCrunchyroll } from "react-icons/si";
import { MdOutlineCatchingPokemon } from "react-icons/md";

export const FilterBar = () => {
    return (
        <div id="scrool-bar" className="w-full flex gap-x-2 overflow-x-auto px-2  ">
            <FilterButton Icon={""} text="Todos" />
            <FilterButton Icon={GiButterfly} text="Animales" />
            <FilterButton Icon={LuBaby} text="Muñecas" />
            <FilterButton Icon={MdOutlineCatchingPokemon} text="Anime" />
        </div>
    );
};
