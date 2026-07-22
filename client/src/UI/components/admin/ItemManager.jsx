// todo la funcion handleFormChange se repite aca y en handleForm

import { useState, useContext } from "react";
import { productRecordsApi } from "../../../api/productRecordsApi.js";
import { SearchForm } from "./SearchForm";
import { InfoItem } from "./InfoItem";
import { EditForm } from "./EditForm";
import { Label } from "./Label";
import { categoriesContext } from "../../../context/categoriesContext";

const STATES = {
    idle: "idle",
    editing: "editing",
};

export const ItemManager = () => {
    const { categories } = useContext(categoriesContext);
    const [editing, setEditing] = useState(false);
    const [results, setResults] = useState([]);
    const [singleItem, setSingleItem] = useState(null);
    // Estado para el formulario (Crear y Editar)
    const [formData, setFormData] = useState({ name_product: "", alt: "", price: "" });
    const [editingId, setEditingId] = useState(null);
    // input settings
    // pasa dinamicamente un array con los input que se deben render en el formulario de edicion
    // el type del input esta hardodeado

    const InputSettings = singleItem
        ? [
              {
                  htmlFor: "name_product",
                  textLabel: "Nombre del producto",
                  id: "name_product",
                  name: "name_product",
                  placeholder: singleItem.name_product,
                  type: "text",
              },
              {
                  htmlFor: "alt",
                  textLabel: "Descripción",
                  id: "alt",
                  name: "alt",
                  placeholder: singleItem.alt,
                  type: "text",
              },
              {
                  htmlFor: "price",
                  textLabel: "Precio",
                  id: "price",
                  name: "price",
                  placeholder: singleItem.price?.toString(),
                  type: "number",
              },
          ]
        : [];

    // --- OPERACIONES ---

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres borrar este ítem?")) {
            await deleteItem(id);
            alert("imagen borrada");
            handleListAll();
            if (singleItem?.public_id === id) setSingleItem(null);
        }
    };

    const handleEdit = (item) => {
        setEditing(true);
        setSingleItem(item);
        setResults([]);
        setEditingId(item.public_id || item.id);
    };

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        value = name === "category_id" ? parseInt(value) : value;
        setFormData({ ...formData, [name]: value });
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleSearch = async (searchId) => {
        setEditing(false);
        if (!searchId.trim()) return;
        setFormData({ name_product: "", alt: "", price: "" });
        const data = await getItem(searchId);
        if (data) {
            // Usamos data[0] si es un array, si no el objeto directo
            const item = Array.isArray(data) ? data[0] : data;
            setSingleItem(item);
            setResults([]);
        }
    };

    const handleListAll = async () => {
        const data = await listItems();
        if (data) {
            setResults(data);
            setEditing(false);
            setSingleItem(null);
            setFormData({ name_product: "", alt: "", price: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            const formDataClean = Object.keys(formData).reduce((accumulator, key) => {
                if (formData[key]) {
                    accumulator[key] = formData[key];
                }
                return accumulator;
            }, {});

            if (Object.keys(formDataClean).length === 0) {
                console.log("No hay cambios para enviar");
                alert("No hay cambios para enviar");

                return;
            }

            console.log(`data que se le envia al server \n ${JSON.stringify(formDataClean)}`);
            const response = await updateItem(editingId, formDataClean);
            if (!response.ok) console.error(response);
            alert("item actualizado");
            setEditingId(null);
        }
        setFormData({ name_product: "", price: "", public_id: "" });
        // al hacer la edicion que ponga el item editado en la misma vista cuando se busca un item solo
        handleSearch(editingId);
        setEditingId(false);
    };

    return (
        <div className="mx-auto pt-6 space-y-6">
            <div className="flex flex-col justify-center items-center w-fit text-primary mx-auto shadow-[0_0_3rem_rgba(0,0,0)] rounded-xl p-4 ">
                <SearchForm
                    textLabel={"Buscar item por ID"}
                    onSearch={handleSearch}
                    onListAll={handleListAll}
                />

                {/* 3. Resultados */}
                <div className="space-y-4">
                    {/* Caso: Búsqueda individual */}
                    {singleItem && (
                        <InfoItem
                            name={singleItem.name_product}
                            price={singleItem.price}
                            public_id={singleItem.public_id}
                            image_url={singleItem.image_url}
                            onCopy={handleCopy}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            singleItem={singleItem}
                        />
                    )}

                    {/* Caso: Lista completa */}
                    <ul>
                        {results &&
                            results.map((item, i) => (
                                <li key={item.public_id}>
                                    <InfoItem
                                        name={item.name_product}
                                        price={item.price}
                                        public_id={item.public_id}
                                        image_url={item.image_url}
                                        onCopy={handleCopy}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                        singleItem={results[i]}
                                    />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div>
                {editing && (
                    <EditForm
                        InputSettings={InputSettings}
                        onSubmit={handleSubmit}
                        onChange={handleOnChange}
                    >
                        <Label text="Categoria del producto" />
                        <select
                            name="category_id"
                            defaultValue={singleItem?.category_id || ""}
                            onChange={handleOnChange}
                            className="border border-white  rounded-lg py-1.5 pl-1 caret-white text-white mb-2 w-full"
                        >
                            <option
                                value=""
                                disabled
                                className="bg-background-dark text-white"
                            >
                                Selecciona categoría
                            </option>
                            {categories.map((cat) => (
                                // El value es el ID para la DB, el texto es el nombre para el usuario
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                    className="bg-background-dark text-white"
                                >
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </EditForm>
                )}
            </div>
        </div>
    );
};
