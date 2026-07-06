// todo el mapeo del nombre de los icono esta hardcodeado

import { GiButterfly } from "react-icons/gi";
import { LuBaby } from "react-icons/lu";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { Cherry } from "lucide-react";
import { FaBoxOpen } from "react-icons/fa6";
import { RiBearSmileFill } from "react-icons/ri";

export const categoryIconMap = {
    animes: MdOutlineCatchingPokemon,
    animales: GiButterfly,
    muñecas: LuBaby,
    objetos: FaBoxOpen,
    amigurumis: RiBearSmileFill,
};

export const defaultIcon = Cherry;
