// fix escroll no sirve 

import { useContext } from "react";
import { FilterButton } from "./FilterButton";
import { categoryIconContext } from "../../../context/categoryIconContext";

export const FilterBar = () => {
    const { categories, getCategoryIcon, handleCategoryFilter } = useContext(categoryIconContext);

    return (
        <div className="w-full flex gap-x-2 overflow-x-auto px-2  ">
            <FilterButton
                draggable={false}
                text="Todos"
                onClick={() => handleCategoryFilter(null)}
            />
            {categories.map((cat) => (
                <FilterButton
                    key={cat.id}
                    Icon={getCategoryIcon(cat.id)}
                    text={cat.name}
                    onClick={() => handleCategoryFilter(cat.name)}
                />
            ))}
        </div>
    );
};
