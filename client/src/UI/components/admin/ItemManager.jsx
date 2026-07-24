import { useState, useContext } from "react";
import { productRecordsApi } from "../../../api/productRecordsApi.js";
import { imagesApi } from "../../../api/imagesApi.js";
import { productsApi } from "../../../api/productsApi.js";
import { SearchForm } from "./SearchForm";
import { InfoItem } from "./InfoItem";
import { FormFields } from "./FormFields";
import { Label } from "./Label";
import { categoriesContext } from "../../../context/categoriesContext";
import { productRecordsContext } from "../../../context/productRecordsContext";
import { Notification } from "../common/Notification.jsx";

const STATES = {
    idle: "idle",
    editing: "editing",
};

const TYPE_NOTIFICACION = {
    success: "success",
    error: "error",
    info: "info",
};

export const ItemManager = () => {
    const { categories } = useContext(categoriesContext);
    const { productRecords, refreshProductRecords } = useContext(productRecordsContext);
    const [selectedItemId, setSelectedItemId] = useState(-1);
    const [mode, setMode] = useState(STATES.idle);
    const [formData, setFormData] = useState({ product_name: "", alt: "", price: "" });
    const [notification, setNotification] = useState(null);

    const selectedItem = productRecords.find((i) => i.id_record === selectedItemId) || null;

    const displayedItems = selectedItemId === -1 ? [] : selectedItemId === null ? productRecords : productRecords.filter((i) => i.id_record === selectedItemId);

    const inputSettings = selectedItem
        ? [
              { htmlFor: "product_name", textLabel: "Nombre del producto", id: "product_name", name: "product_name", value: formData.product_name, placeholder: selectedItem.product_name, type: "text" },
              { htmlFor: "alt", textLabel: "Descripcion", id: "alt", name: "alt", value: formData.alt, placeholder: selectedItem.alt, type: "text" },
              { htmlFor: "price", textLabel: "Precio", id: "price", name: "price", value: formData.price, placeholder: selectedItem.price?.toString(), type: "number" },
          ]
        : [];

    const handleList = () => {
        setSelectedItemId(null);
        setMode(STATES.idle);
    };

    const handleSearch = (id) => {
        const found = productRecords.find((i) => i.id_record === Number(id));
        if (found) {
            setSelectedItemId(found.id_record);
        }
        setMode(STATES.idle);
    };

    const handleEdit = (item) => {
        setMode(STATES.editing);
        setSelectedItemId(item.id_record);
        setFormData({ product_name: item.product_name, alt: item.alt || "", price: item.price || "" });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Seguro que quieres borrar este item?")) {
            try {
                const record = await productRecordsApi.getById(id);
                if (!record) {
                    setNotification({ message: "No hay cambios para enviar", type: TYPE_NOTIFICACION.error });
                    return;
                }

                await productRecordsApi.delete(id);

                await imagesApi.delete(record.id_image);

                await productsApi.delete(record.id_product);

                setSelectedItemId(-1);
                setMode(STATES.idle);
                await refreshProductRecords();
                setNotification({ message: "Item eliminado", type: TYPE_NOTIFICACION.success });
            } catch (error) {
                setNotification({ message: "Error al eliminar: " + error.message, type: TYPE_NOTIFICACION.error });
            }
        }
    };

    const executeUpdate = async (updates, updateFn, entityName) => {
        if (!updates || Object.keys(updates).length === 0) return { success: false, skipped: true };

        const result = await updateFn();
        if (typeof result === "string") {
            return { success: false, error: `${entityName}: ${result}` };
        }

        return { success: true };
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        if (!selectedItemId || !selectedItem) return;

        const name = formData.product_name?.trim();
        const price = formData.price?.trim();
        const alt = formData.alt?.trim();

        const productUpdates = {};
        const imageUpdates = {};
        const recordUpdates = {};

        if (name && name !== selectedItem.product_name?.trim()) productUpdates.name = name;
        if (price && Number(price) !== Number(selectedItem.price)) productUpdates.price = price;
        if (alt && alt !== (selectedItem.alt || "").trim()) imageUpdates.alt = alt;
        if (formData.id_category && Number(formData.id_category) !== Number(selectedItem.id_category)) recordUpdates.id_category = formData.id_category;

        const hasUpdates = Object.keys(productUpdates).length > 0 || Object.keys(imageUpdates).length > 0 || Object.keys(recordUpdates).length > 0;

        if (!hasUpdates) {
            setNotification({ message: "No hay cambios para enviar", type: TYPE_NOTIFICACION.info });
            return;
        }

        const operations = [
            { updates: productUpdates, fn: () => productsApi.update(selectedItem.id_product, productUpdates), label: "Producto" },
            { updates: imageUpdates, fn: () => imagesApi.update(selectedItem.id_image, imageUpdates), label: "Imagen" },
            { updates: recordUpdates, fn: () => productRecordsApi.update(selectedItemId, recordUpdates), label: "Registro" },
        ];

        let successCount = 0;
        const errorMessages = [];

        for (const { updates, fn, label } of operations) {
            const res = await executeUpdate(updates, fn, label);
            if (res.success) successCount++;
            if (res.error) errorMessages.push(res.error);
        }

        setFormData({ product_name: "", alt: "", price: "" });
        setMode(STATES.idle);
        setSelectedItemId(-1);
        await refreshProductRecords();

        if (successCount > 0) {
            setNotification({ message: "Item actualizado", type: TYPE_NOTIFICACION.success });
        } else {
            setNotification({ message: "Error al actualizar", type: TYPE_NOTIFICACION.error });
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="mx-auto pt-6 space-y-6">
            <div className="flex flex-col justify-center items-center w-fit text-primary mx-auto shadow-[0_0_3rem_rgba(0,0,0)] rounded-xl p-4 ">
                <SearchForm
                    textLabel={"Buscar item por ID de registro"}
                    onSearch={handleSearch}
                    onListAll={handleList}
                />

                <div className="space-y-4">
                    {mode === STATES.idle && displayedItems.length > 0 && (
                        <ul>
                            {displayedItems.map((item) => (
                                <li key={item.id_record}>
                                    <InfoItem
                                        id_record={item.id_record}
                                        name={item.product_name}
                                        price={item.price}
                                        public_id={item.public_id}
                                        image_url={item.image_url}
                                        category_name={item.category_name}
                                        onCopy={handleCopy}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                        singleItem={item}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div>
                {mode === STATES.editing && selectedItem && (
                    <FormFields
                        title="Editar producto"
                        InputSettings={inputSettings}
                        onSubmit={handleSubmitUpdate}
                        onChange={handleChange}
                    >
                        <Label text="Categoria del producto" />
                        <select
                            name="id_category"
                            defaultValue={selectedItem.id_category || ""}
                            onChange={handleChange}
                            className="border border-white rounded-lg py-1.5 pl-1 caret-white text-white mb-2 w-full"
                        >
                            <option
                                value=""
                                disabled
                                className="bg-background-dark text-white"
                            >
                                Selecciona categoria
                            </option>
                            {categories.map((cat) => (
                                <option
                                    key={cat.id_category}
                                    value={cat.id_category}
                                    className="bg-background-dark text-white"
                                >
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </FormFields>
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
