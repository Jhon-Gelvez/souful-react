import { useState } from "react";
import { listCategories, createCategory, deleteCategory, getCategory, updateCategory } from "../../../api/categoryApi";
import { SearchForm } from "./SearchForm";
import { EditForm } from "./EditForm";
import { CreateForm } from "./CreateForm";
import { InfoCategory } from "./InfoCategory";

export const CategoryManager = () => {
    const [items, setItems] = useState([]);
    const [mode, setMode] = useState("idle"); // idle | creating | editing
    const [formData, setFormData] = useState({ name: "" });

    const handleListAll = async () => {
        const data = await listCategories();
        if (data) {
            setItems(data);
        }
        setMode("idle");
    };

    const handleSearch = async (id) => {
        const data = await getCategory(id);
        setItems(data);
        setMode("idle");
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) return;

        const result = await createCategory({ name: formData.name });
        if (result) {
            setFormData({ name: "" });
            setMode("idle");
            handleSearch(result.id);
        }
    };

    const handleEdit = (cat) => {
        setMode("editing");
        setItems([cat]);
        setFormData({ name: cat.name });
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
            await deleteCategory(id);
            handleListAll();
        }
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        const result = await updateCategory(items[0].id, { name: formData.name });
        if (result) {
            setFormData({ name: "" });
            setMode("idle");
            handleSearch(result.id);
        }
    };

    const handleOnChange = (e) => {
        setFormData({ name: e.target.value });
    };

    const handleCreatingState = () => {
        setMode("creating");
        setItems([]);
        setFormData({ name: "" });
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="mx-auto pb-6 space-y-6">
            <div className="flex flex-col justify-center items-center w-fit text-primary mx-auto shadow-[0_0_3rem_rgba(0,0,0)] rounded-xl p-4 ">
                <SearchForm
                    create
                    onCreate={handleCreatingState}
                    textLabel={"Buscar categoria por ID"}
                    onSearch={handleSearch}
                    onListAll={handleListAll}
                />

                <div className="space-y-4">
                    {mode === "idle" && items.length > 0 && (
                        <ul>
                            {items.map((item, i) => (
                                <li key={i}>
                                    <InfoCategory
                                        category={item}
                                        onCopy={handleCopy}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div>
                {mode === "editing" && (
                    <EditForm
                        label="Editar Categoria"
                        InputSettings={{
                            htmlFor: "name",
                            textLabel: "Nombre de la categoria",
                            id: "name",
                            name: "name",
                            placeholder: items[0].name,
                            type: "text",
                        }}
                        onSubmit={handleSubmitEdit}
                        onChange={handleOnChange}
                    />
                )}
            </div>
            <div>
                {mode === "creating" && (
                    <CreateForm
                        InputSettings={{
                            htmlFor: "name",
                            textLabel: "Nombre de la categoria",
                            id: "name",
                            name: "name",
                            placeholder: "Nombre de la categoria",
                            type: "text",
                        }}
                        onSubmit={handleCreate}
                        onChange={handleOnChange}
                    />
                )}
            </div>
        </div>
    );
};
