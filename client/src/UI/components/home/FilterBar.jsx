import { useContext, useRef, useState } from "react";
import { FilterButton } from "./FilterButton";
import { categoryIconContext } from "../../../context/categoryIconContext";

export const FilterBar = () => {
    const { categories, getCategoryIcon, handleCategoryFilter } = useContext(categoryIconContext);
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => setIsDragging(false);

    return (
        <div
            ref={scrollRef}
            className={`w-full flex gap-x-2 overflow-x-auto px-2 no-scrollbar select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            <FilterButton
                draggable={false}
                text="Todos"
                onClick={() => handleCategoryFilter(null)}
            />
            {categories.map((cat) => (
                <FilterButton
                    key={cat.id_category}
                    Icon={getCategoryIcon(cat.id_category)}
                    text={cat.name}
                    onClick={() => handleCategoryFilter(cat.name)}
                />
            ))}
        </div>
    );
};
