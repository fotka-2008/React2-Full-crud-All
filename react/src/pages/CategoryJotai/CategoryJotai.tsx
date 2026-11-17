import { useState } from 'react'
import { useAtom } from 'jotai'
import { categoriesAtom } from '../../jotai/categoryAtom'
import type { ICategory } from '../../jotai/categoryAtom'

const CategoryJotai = () => {
  const [categories, setCategories] = useAtom(categoriesAtom)

  const [name, setName] = useState('')
  const [type, setType] = useState('Electronics')
  const [editId, setEditId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')

  const handleAdd = () => {
    if (!name) {
      alert('Fill name')
      return
    }
    setCategories([...categories, { id: Date.now(), name: name, type: type }])
    setName('')
    setType('Electronics')
  }

  const handleEdit = (category: ICategory) => {
    setEditId(category.id)
    setName(category.name)
    setType(category.type)
  }

  const handleUpdate = () => {
    if (editId === null) {
      return
    }
    if (!name) {
      alert('Fill name')
      return
    }
    setCategories(categories.map((e) => (e.id === editId ? { id: editId, name: name, type: type } : e)))
    setEditId(null)
    setName('')
    setType('Electronics')
  }

  const handleDelete = (id: number) => {
    setCategories(categories.filter((e) => e.id !== id))
  }

  const filteredCategories = categories.filter((e) => {
    const bySearch = e.name.toLowerCase().includes(search.toLowerCase())
    const byType = filterType === 'all' || e.type === filterType
    return bySearch && byType
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Category - Jotai</h1>

      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
        <h2 className="text-lg font-bold">{editId === null ? 'Add category' : 'Edit category'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded px-3 py-2">
          <option value="Electronics">Electronics</option>
          <option value="Food">Food</option>
          <option value="Clothes">Clothes</option>
        </select>
        {editId === null ? (
          <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            add
          </button>
        ) : (
          <button onClick={handleUpdate} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            save
          </button>
        )}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded px-3 py-2 bg-white"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded px-3 py-2 bg-white"
        >
          <option value="all">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food</option>
          <option value="Clothes">Clothes</option>
        </select>
      </div>

      {filteredCategories.map((e) => {
        return (
          <div key={e.id} className="flex items-center justify-between bg-white rounded-lg shadow p-4">
            <div>
              <h3 className="text-lg font-semibold">{e.name}</h3>
              <p className="text-gray-600">{e.type}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(e)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
              >
                edit
              </button>
              <button
                onClick={() => handleDelete(e.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CategoryJotai
