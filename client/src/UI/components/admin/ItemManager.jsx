import { useState, useEffect } from "react";
import { getItem, listItems, createItem, updateItem, deleteItem } from "../../../api/itemApi";
import { SearchForm } from "./SearchForm";
import { InfoItem } from "./InfoItem";
import { EditForm } from "./EditForm";

// estructura de un item
// alt
// category_id
// created_at
// dimensions
// file_size
// id
// image_url
// is_active
// mime_type
// name_product
// price
// public_id
// updated_at

export const ItemManager = () => {
    const [editingin, setEditingin] = useState(false);
    const [results, setResults] = useState([]);
    const [singleItem, setSingleItem] = useState(null);
    // Estado para el formulario (Crear y Editar)
    const [formData, setFormData] = useState({ name_product: "", alt: "", price: "" });
    const [editingId, setEditingId] = useState(null);
    // input settings
    // pasa dinamicamente un array con los input que se deben render en el formulario de edicion
    // el type del input esta hardodeado
    const [InputSettings, setInputSettings] = useState([]);

    useEffect(() => {
        if (singleItem !== null) {
            setInputSettings([
                { htmlFor: singleItem.name_product, textLabel: "Nombre del producto", id: singleItem.name_product, name: "name_product", placeholder: singleItem.name_product, type: "text" },
                { htmlFor: singleItem.alt, textLabel: "Descripcion", id: singleItem.alt, name: "alt", placeholder: singleItem.alt, type: "text" },
                { htmlFor: singleItem.price, textLabel: "Precio", id: singleItem.price, name: "price", placeholder: singleItem.price, type: "number" },
            ]);
        }
    }, [singleItem]);

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
        setEditingin(true);
        setSingleItem(item);
        setResults([]);
        setEditingId(item.public_id || item.id);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        console.log(formData);
        console.log(name);
        setFormData({ ...formData, [name]: value });
        formData ? console.log(formData) : console.log("campo nulo");
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleSearch = async (searchId) => {
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
            setEditingin(false);
            setSingleItem(null);
            setFormData({ name_product: "", alt: "", price: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            // Actualizar
            setFormData(handleOnChange());
            console.log(formData);
            const response = await updateItem(editingId, formData);
            if (!response.ok) console.error(response);
            alert("item actualizado");
            setEditingId(null);
        }
        setFormData({ name_product: "", price: "", public_id: "" });
        handleSearch(formData.public_id);
    };

    return (
        <div className="mx-auto p-6 space-y-6">
            <div className="flex flex-col justify-center items-center w-fit text-primary mx-auto shadow-[0_0_3rem_rgba(0,0,0)] rounded-xl p-4 ">
                <SearchForm onSearch={handleSearch} onListAll={handleListAll} />

                {/* 3. Resultados */}
                <div className="space-y-4">
                    {/* Caso: Búsqueda individual */}
                    {singleItem && <InfoItem name={singleItem.name_product} price={singleItem.price} public_id={singleItem.public_id} image_url={singleItem.image_url} onCopy={handleCopy} onDelete={handleDelete} onEdit={handleEdit} singleItem={singleItem} />}

                    {/* Caso: Lista completa */}
                    <ul>
                        {results &&
                            results.map((item, i) => (
                                <li key={item.public_id}>
                                    <InfoItem name={item.name_product} price={item.price} public_id={item.public_id} image_url={item.image_url} onCopy={handleCopy} onDelete={handleDelete} onEdit={handleEdit} singleItem={results[i]} />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div>{editingin && <EditForm InputSettings={InputSettings} onSubmit={handleSubmit} onChange={handleOnChange} />}</div>
        </div>
    );
};
