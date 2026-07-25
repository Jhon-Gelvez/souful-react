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
                <main className="flex flex-col justify-center items-center w-full text-primary mx-auto">
                    <div className="rounded-xl pb-2 px-3 sm:p-8 sm:pb-4 shadow-[0_0_3rem_rgba(0,0,0)] shadow-black bg-background-dark w-md">
                        <h1 className="text-3xl font-bold text-center my-2">Panel de Administración</h1>
                        <p className="text-xl text-center my-3">Sube una imagen!!</p>
                        <Form />
                    </div>
                </main>
                <ItemManager />
                <CategoryManager />
            </productRecordsContext.Provider>
        </categoriesContext.Provider>
    );
};
