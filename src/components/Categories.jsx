import {useEffect, useState} from 'react'; 
import {getCategories, createCategory, deleteCategory} from "../api/api"; 


export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: ''
  })

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async () => {
    await createCategory(form); 
    getCategories().then(res => setCategories(res.data));
  };

  const handleDelete = async (id) => {
    await deleteCategory(id); 
    setCategories(categories.filter(c => c.id !== id));
  };

  return(
    <div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="bg-green-100 border border-green-300 rounded-lg p-6">
      <input placeholder="Name" onChange={e => setForm({... form, name: e.target.value})}/>
      </div>

      <div className = "flex justify-center">
      <button className="bg-white-50 border border-black-500 rounded-lg p-1 text mt-3 mb-3" onClick={handleSubmit}>Add Category</button>
      </div>

      {
        categories.map(c => (
          <div className="border border-red-300 rounded-lg p-3 mb-2 flex justify-between items-center" key={c.id}>
          <span className="font-medium">{c.name}</span>
          <button onClick={() => handleDelete(c.id)} className="text-red-500">Delete</button>
        </div>
        ))}
        </div> 

  )
}