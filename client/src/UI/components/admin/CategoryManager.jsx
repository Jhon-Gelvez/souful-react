import React, { useState, useEffect } from "react";
import { listCategories, createCategory, deleteCategory, getCategory, updateCategory } from "../../../api/categoryApi";
import { SearchForm } from "./SearchForm";
import { EditForm } from "./EditForm";
import { CreateForm } from "./CreateForm";
import { InfoCategory } from "./InfoCategory";
import { FiCloudLightning } from "react-icons/fi";

// created_at
// :
// "2026-02-10T15:44:52.000Z"
// id
// :
// 1
// name
// :
// "anime"

export const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    const [newCategory, setNewCategory] = useState({ name: "" });
    const [editCategory, setEditCategory] = useState({ name: "" });

    const [editing, setEditing] = useState(false);
    const [creating, setCreating] = useState(false);

    const InputSettings = editCategory
        ? [
              {
                  htmlFor: "name",
                  textLabel: "Nombre de la categoria",
                  id: "name",
                  name: "name",
                  placeholder: editCategory.name,
                  type: "text",
              },
          ]
        : [];

    const createInputSettings = [
        {
            htmlFor: "name",
            textLabel: "Nombre de la categoria",
            id: "name",
            name: "name",
            placeholder: "Nombre de la categoria",
            type: "text",
        },
    ];

    const handleListAll = async () => {
        const data = await listCategories();
        if (data) {
            setCategories(data);
            setCategory(null);
        }
        setEditing(false);
        setCreating(false);
    };

    const handleSearch = async (id) => {
        const data = await getCategory(id);
        setCategory(data[0]);
        setCategories([]);
        setEditing(false);
        setCreating(false);
    };

    const handleCreate = async (e) => {
        setEditing(false);

        e.preventDefault();
        if (!newCategory.name.trim()) return;

        const result = await createCategory(newCategory);
        if (result) {
            setNewCategory({ name: "" });
            setCreating(false);
            setEditing(false);
            handleSearch(result.id);
        }
    };
    // al enviar el formulario de edicion el objeto se sobre escribe y solo queda el name
    // TODO
    // necesita recibir el objeto completo no solo el editCategory
    // parche horrible

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        if (!editCategory.name.trim()) return;
        console.log(editCategory.id, { name: editCategory.name });
        const result = await updateCategory(editCategory.id, { name: editCategory.name });
        console.log(result);
        if (result) {
            setEditCategory({ name: "" });
            setCategory(result);
            handleSearch(result.id);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
            await deleteCategory(id);
            handleListAll();
        }
    };

    // extrae el valor de un input
    const handleOnChange = (e) => {
        const value = e.target.value;
        setNewCategory({ name: value });
    };

    const handleOnChangeEdit = (e) => {
        const value = e.target.value;
        setEditCategory({ ...editCategory, name: value });
    };
    // controla el estado al crear una categoria
    const handleCreatingState = () => {
        setCreating(true);
        setCategories([]);
        setEditing(false);
        setCategory(false);
    };

    //pasar a info item
    // controla el estado para el menu de edicion
    const handleEdit = async (category) => {
        setEditing(true);
        setEditCategory(category);
        setCategory(null);
        setCategories([]);
        console.log(category);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="mx-auto pb-6 space-y-6">
            <div className="flex flex-col justify-center items-center w-fit text-primary mx-auto shadow-[0_0_3rem_rgba(0,0,0)] rounded-xl p-4 ">
                <SearchForm create onCreate={handleCreatingState} textLabel={"Buscar categoria por ID"} onSearch={handleSearch} onListAll={handleListAll} />

                {/* 3. Resultados */}
                <div className="space-y-4">
                    {/* Caso: Búsqueda individual */}
                    {category && <InfoCategory category={category} onCopy={handleCopy} onEdit={handleEdit} onDelete={handleDelete} />}

                    {/* Caso: Lista completa */}
                    <ul>
                        {categories &&
                            categories.map((category, i) => (
                                <li key={i}>
                                    <InfoCategory category={category} onCopy={handleCopy} onEdit={handleEdit} onDelete={handleDelete} />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div>{editing && <EditForm label="Editar Categoria" InputSettings={InputSettings} onSubmit={handleSubmitEdit} onChange={handleOnChangeEdit} />}</div>
            <div>{creating && <CreateForm InputSettings={createInputSettings} onSubmit={handleCreate} onChange={handleOnChange} />}</div>
        </div>
    );
};
