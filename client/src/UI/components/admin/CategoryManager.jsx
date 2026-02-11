import React, { useState, useEffect } from 'react';
import { listCategories, createCategory, deleteCategory } from '../../../api/categoryApi'; 

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await listCategories();
    if (data) setCategories(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;
    
    const result = await createCategory(newCategory);
    if (result) {
      setNewCategory({ name: '' });
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      await deleteCategory(id);
      fetchData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-2xl border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="bg-emerald-500 w-2 h-8 rounded-full"></span>
        Gestión de Categorías
      </h2>
      
      {/* Formulario de Creación */}
      <form onSubmit={handleCreate} className="flex gap-3 mb-8">
        <input 
          type="text" 
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
          placeholder="Nombre de la nueva categoría..."
          value={newCategory.name}
          onChange={(e) => setNewCategory({ name: e.target.value })}
        />
        <button 
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-sm"
        >
          Agregar
        </button>
      </form>

      {/* Lista de Categorías */}
      <div className="bg-gray-50 rounded-xl p-2">
        <ul className="divide-y divide-gray-200">

            {console.log(categories)}
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li 
                key={cat.id || cat._id} 
                className="flex items-center justify-between p-4 hover:bg-white hover:shadow-sm rounded-lg transition-all group"
              >
                <span className="text-gray-700 font-medium capitalize">
                  {cat.name}
                </span>
                <button 
                  onClick={() => handleDelete(cat.id || cat._id)}
                  className="opacity-0 group-hover:opacity-100 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Eliminar
                </button>
              </li>
            ))
          ) : (
            <p className="text-center py-6 text-gray-400 italic">No hay categorías disponibles.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManager;