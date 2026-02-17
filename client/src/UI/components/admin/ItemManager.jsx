import React, { useState } from "react";
import { getItem, listItems, createItem, updateItem, deleteItem } from "../../../api/itemApi";
import { SearchForm } from "./SearchForm";
import { InfoItem } from "./InfoItem";
import { EditForm } from "./EditForm";

export const ItemManager = () => {
    const [editingin, setEditingin] = useState(false);
    const [results, setResults] = useState([]);
    const [singleItem, setSingleItem] = useState(null);

    // Estado para el formulario (Crear y Editar)
    const [formData, setFormData] = useState({ name_product: "", price: "", image_url: "" });
    const [editingId, setEditingId] = useState(null);

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
        setResults([]);
        setEditingId(item.public_id || item.id);
        setFormData({ name_product: item.name_product, price: item.price });
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleSearch = async (searchId) => {
        if (!searchId.trim()) return;
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
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            // Actualizar
            const response = await updateItem(editingId, formData);
            if (!response.ok) console.error(response);
            setEditingId(null);
        } else {
            // Crear
            await createItem(formData);
        }
        setFormData({ name_product: "", price: "" });
        handleListAll(); // Refrescar lista
    };

    return (
        <div className="mx-auto p-6 space-y-6">
            {/* 1. Formulario de Creación / Edición */}
            {/* <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-100">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                    {editingId ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <input 
                        type="text" 
                        placeholder="Nombre del producto"
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={formData.name_product}
                        onChange={(e) => setFormData({...formData, name_product: e.target.value})}
                        required
                    />
                    <input 
                        type="number" 
                        placeholder="Precio"
                        className="w-full md:w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        required
                    />
                    <button type="submit" className={`px-6 py-2 rounded-lg text-white font-bold transition-all ${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                        {editingId ? 'Actualizar' : 'Guardar'}
                    </button>
                    {editingId && (
                        <button onClick={() => {setEditingId(null); setFormData({name_product:'', price:''})}} className="text-gray-500 underline text-sm">Cancelar</button>
                    )}
                </form>
            </div> */}

            {/* 2. Búsqueda y Listado */}
            <div className="flex flex-col justify-center items-center w-fit text-primary mx-auto shadow-[0_0_3rem_rgba(0,0,0)] rounded-xl p-4 ">
                <SearchForm onSearch={handleSearch} onListAll={handleListAll} />

                {/* 3. Resultados */}
                <div className="space-y-4">
                    {/* Caso: Búsqueda individual */}
                    {singleItem && <InfoItem name={singleItem.name_product} price={singleItem.price} public_id={singleItem.public_id} image_url={singleItem.image_url} onCopy={handleCopy} onDelete={handleDelete} onEdit={handleEdit} singleItem={singleItem} />}

                    {/* Caso: Lista completa */}
                    <ul>
                        {results &&
                            results.map((item) => (
                                <li key={item.public_id}>
                                    <InfoItem name={item.name_product} price={item.price} public_id={item.public_id} image_url={item.image_url} onCopy={handleCopy} onDelete={handleDelete} onEdit={handleEdit} singleItem={singleItem} />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div>{editingin && <EditForm />}</div>
        </div>
    );
};
