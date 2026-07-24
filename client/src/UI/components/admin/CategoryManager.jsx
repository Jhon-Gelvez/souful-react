import { useState, useContext } from "react";
import { categoriesApi } from "../../../api/categoriesApi";
import { SearchForm } from "./SearchForm";
import { FormFields } from "./FormFields";
import { InfoCategory } from "./InfoCategory";
import { categoriesContext } from "../../../context/categoriesContext";
import { Notification } from "../common/Notification.jsx";

export const CategoryManager = () => {
    const STATES = {
        idle: "idle",
        creating: "creating",
        editing: "editing",
    };

    const TYPE_NOTIFICACION = {
        success: "success",
        error: "error",
        info: "info",
    };

    const { categories, refreshCategories } = useContext(categoriesContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
    const [mode, setMode] = useState(STATES.idle);
    const [formData, setFormData] = useState({ name: "" });
    const [notification, setNotification] = useState(null);

    const displayedCategories =
        selectedCategoryId === -1 ? [] : selectedCategoryId === null ? categories : categories.filter((c) => c.id_category === selectedCategoryId);

    const selectedCategory = categories.find((c) => c.id_category === selectedCategoryId);

    const handleList = () => {
        setSelectedCategoryId(null);
        setMode(STATES.idle);
    };

    const handleSearch = (id) => {
        const found = categories.find((c) => c.id_category === Number(id));
        if (found) {
            setSelectedCategoryId(found.id_category);
        }
        setMode(STATES.idle);
    };

    const handleCreate = () => {
        setMode(STATES.creating);
        setSelectedCategoryId(-1);
        setFormData({ name: "" });
    };

    const handleEdit = (cat) => {
        setMode(STATES.editing);
        setSelectedCategoryId(cat.id_category);
        setFormData({ name: cat.name });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Estas seguro de eliminar esta categoria?")) {
            try {
                const result = await categoriesApi.delete(id);
                if (typeof result === "string") {
                    setNotification({ message: "Error al eliminar: " + result, type: TYPE_NOTIFICACION.error });
                    return;
                }
                setSelectedCategoryId(-1);
                setMode(STATES.idle);
                await refreshCategories();
                setNotification({ message: "Categoria eliminada", type: TYPE_NOTIFICACION.success });
            } catch (error) {
                setNotification({ message: "Error al eliminar: " + error.message, type: TYPE_NOTIFICACION.error });
            }
        }
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) return;

        const result = await categoriesApi.create({ name: formData.name });
        if (result) {
            setFormData({ name: "" });
            setMode(STATES.idle);
            await refreshCategories();
            setSelectedCategoryId(result.categoryId);
        }
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        if (!selectedCategoryId || !selectedCategory) return;

        const name = formData.name?.trim();

        if (!name || name === selectedCategory.name?.trim()) {
            setNotification({ message: "No hay cambios para enviar", type: TYPE_NOTIFICACION.info });
            return;
        }

        const result = await categoriesApi.update(selectedCategoryId, { name });
        if (typeof result === "string") {
            setNotification({ message: "Error al actualizar: " + result, type: TYPE_NOTIFICACION.error });
            return;
        }

        setFormData({ name: "" });
        setMode(STATES.idle);
        setSelectedCategoryId(-1);
        await refreshCategories();
        setNotification({ message: "Categoria actualizada", type: TYPE_NOTIFICACION.success });
    };

    const handleChange = (e) => {
        setFormData({ name: e.target.value });
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="mx-auto pb-6 space-y-6">
            <div className="flex flex-col justify-center category-center w-fit text-primary mx-auto shadow-[0_0_3rem_rgba(0,0,0)] rounded-xl p-4 ">
                <SearchForm
                    create
                    onCreate={handleCreate}
                    textLabel={"Buscar categoria por ID"}
                    onSearch={handleSearch}
                    onListAll={handleList}
                />

                <div className="space-y-4">
                    {mode === STATES.idle && displayedCategories.length > 0 && (
                        <ul>
                            {displayedCategories.map((category) => (
                                <li key={category.id_category}>
                                    <InfoCategory
                                        category={category}
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
                {mode === STATES.editing && selectedCategory && (
                    <FormFields
                        title="Editar Categoria"
                        InputSettings={[
                            {
                                htmlFor: "name",
                                textLabel: "Nombre de la categoria",
                                id: "name",
                                name: "name",
                                value: formData.name,
                                placeholder: selectedCategory.name,
                                type: "text",
                            },
                        ]}
                        onSubmit={handleSubmitUpdate}
                        onChange={handleChange}
                    />
                )}
            </div>
            <div>
                {mode === STATES.creating && (
                    <FormFields
                        title="Crear categoria"
                        InputSettings={[
                            {
                                htmlFor: "name",
                                textLabel: "Nombre de la categoria",
                                id: "name",
                                name: "name",
                                value: formData.name,
                                placeholder: "Nombre de la categoria",
                                type: "text",
                            },
                        ]}
                        onSubmit={handleSubmitCreate}
                        onChange={handleChange}
                    />
                )}
            </div>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
};
