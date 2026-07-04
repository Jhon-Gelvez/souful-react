import { useState, useEffect } from "react";
import { CategoryManager } from "../components/admin/CategoryManager";
import { Form } from "../components/admin/Form";
import { ItemManager } from "../components/admin/ItemManager";
import { listCategories } from "../../api/categoryApi";
import { categoriesContext } from "../../context/categoriesContext";

export const Admin = () => {
    const [categories, setCategories] = useState([]);

    const refreshCategories = async () => {
        const data = await listCategories();
        if (data) setCategories(data);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await listCategories();
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <categoriesContext.Provider value={{ categories, refreshCategories }}>
            <Form />
            <ItemManager />
            <CategoryManager />
        </categoriesContext.Provider>
    );
};
