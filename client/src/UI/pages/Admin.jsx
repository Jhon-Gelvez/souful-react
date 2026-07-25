import { useState, useEffect } from "react";
import { CategoryManager } from "../components/admin/CategoryManager";
import { Form } from "../components/admin/Form";
import { ItemManager } from "../components/admin/ItemManager";
import { categoriesApi } from "../../api/categoriesApi";
import { productRecordsApi } from "../../api/productRecordsApi";
import { categoriesContext } from "../../context/categoriesContext";
import { productRecordsContext } from "../../context/productRecordsContext";

export const Admin = () => {
    const [categories, setCategories] = useState([]);
    const [productRecords, setProductRecords] = useState([]);

    const refreshCategories = async () => {
        try {
            const data = await categoriesApi.get();
            setCategories(data);
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    };

    const refreshProductRecords = async () => {
        try {
            const data = await productRecordsApi.get();
            setProductRecords(data);
        } catch (error) {
            console.error("Error loading product records:", error);
        }
    };

    useEffect(() => {
        refreshCategories();
        refreshProductRecords();
    }, []);

    return (
        <categoriesContext.Provider value={{ categories, refreshCategories }}>
            <productRecordsContext.Provider value={{ productRecords, refreshProductRecords }}>
                <Form />
                <ItemManager />
                <CategoryManager />
            </productRecordsContext.Provider>
        </categoriesContext.Provider>
    );
};
