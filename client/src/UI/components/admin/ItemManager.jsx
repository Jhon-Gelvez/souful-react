import React, { useState } from "react";
import { getItem, listItems, createItem, updateItem, deleteItem } from "../../../api/itemApi";

export const ItemManager = () => {
    const [searchId, setSearchId] = useState("");
    const [results, setResults] = useState([]);
    const [singleItem, setSingleItem] = useState(null);

    // Estado para el formulario (Crear y Editar)
    const [formData, setFormData] = useState({ name_product: "", price: "", image_url: "" });
    const [editingId, setEditingId] = useState(null);

    // --- OPERACIONES ---

    const handleSearch = async () => {
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

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres borrar este ítem?")) {
            try {
                // 'data' ya son los datos finales porque handleResponse hizo el trabajo sucio
                const data = await deleteItem(id);

                console.log("Datos recibidos:", data);

                // IMPORTANTE: Como handleResponse ya procesó la respuesta,
                // no tienes el "response.ok".
                // Debes validar según lo que devuelva tu API (ej. data.success o data.id)
                if (data) {
                    alert("Imagen borrada exitosamente!");
                    handleListAll();
                    if (singleItem?.public_id === id) setSingleItem(null);
                }
            } catch (error) {
                console.error("Error en la petición:", error);
            }
        }
    };

    const startEdit = (item) => {
        setEditingId(item.public_id || item.id);
        setFormData({ name_product: item.name_product, price: item.price });
    };

    return (
        <div className="mx-auto p-6">
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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                    <div className="w-full md:w-1/2 space-y-2">
                        <label className="text-md font-bold text-white underline">Buscar por ID</label>
                        <div className="flex gap-2 mt-1.5">
                            <input type="text" className="flex-1 px-4 py-2 border border-primary rounded-lg  focus:ring-2    outline-none" placeholder="ID del producto..." value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                            <button onClick={handleSearch} className="bg-white/10 text-white px-4 py-2 rounded-lg focus:bg-primary focus:text-black focus:font-bold active:scale-95 transition-transform">
                                Buscar
                            </button>
                        </div>
                    </div>
                    <button onClick={handleListAll} className="bg-white/10 text-white px-4 py-2 rounded-lg focus:bg-primary focus:text-black focus:font-bold active:scale-95 transition-transform">
                        Listar Todos
                    </button>
                </div>

                {/* 3. Resultados */}
                <div className="space-y-4">
                    {/* Caso: Búsqueda individual */}
                    {singleItem && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center animate-pulse">
                            <div>
                                <p className="font-bold text-blue-900">
                                    {singleItem.name_product} <span className="text-sm font-normal opacity-70">({singleItem.public_id})</span>
                                </p>
                                <p className="text-blue-700">${singleItem.price}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => startEdit(singleItem)} className="text-blue-600 font-bold hover:underline">
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(singleItem.public_id)} className="text-red-600 font-bold hover:underline">
                                    Borrar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Caso: Lista completa */}
                    <ul>
                        {results.map((item) => (
                            <li key={item.public_id} className="py-4 flex justify-between items-center  px-2 rounded-lg border border-primary/60 mb-2">
                                <div>
                                    <p className="font-medium text-white">{item.name_product}</p>
                                    <p className="text-sm text-white">
                                        ${item.price} • <span className="text-xs uppercase">{item.public_id}</span>
                                    </p>
                                    <span> {item.image_url}</span>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => startEdit(item)} className="text-2xl p-2 text-primary bg-white/5 rounded-full ml-2 cursor-pointer hover:bg-primary hover:text-black hover:font-bold active:scale-95 transition-transform">
                                        ✎
                                    </button>
                                    <button onClick={() => handleDelete(item.public_id)} className="text-2xl p-2 text-red-500 bg-white/5 rounded-full cursor-pointer hover:bg-primary hover:text-black font-bold active:scale-95 transition-transform">
                                        ✕
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
