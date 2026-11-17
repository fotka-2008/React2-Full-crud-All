import { useState } from 'react'
import {
  IMAGE_URL,
  useAddTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from '../../api/todo'
import type { ITodo } from '../../api/todo.type'

const Async3 = () => {
  const { data, isLoading, isError, refetch } = useGetTodosQuery('')
  const [addFn] = useAddTodoMutation()
  const [updateFn] = useUpdateTodoMutation()
  const [deleteFn] = useDeleteTodoMutation()
  const [completeFn] = useCompleteTodoMutation()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const handleAdd = async () => {
    if (!name || !description || !image) {
      alert('Fill name, description and choose image')
      return
    }
    const formData = new FormData()
    formData.append('Name', name)
    formData.append('Description', description)
    formData.append('Images', image)
    await addFn(formData)
    refetch()
    setName('')
    setDescription('')
    setImage(null)
  }

  const handleEdit = (todo: ITodo) => {
    setEditId(todo.id)
    setEditName(todo.name)
    setEditDescription(todo.description)
  }

  const handleSave = async () => {
    if (editId === null) {
      return
    }
    if (!editName || !editDescription) {
      alert('Fill name and description')
      return
    }
    await updateFn({ id: editId, name: editName, description: editDescription })
    refetch()
    setEditId(null)
  }

  const handleDelete = async (id: number) => {
    await deleteFn(id)
    refetch()
  }

  const handleComplete = async (id: number) => {
    await completeFn(id)
    refetch()
  }

  if (isLoading) {
    return <h1 className="text-xl">Loading...</h1>
  }
  if (isError) {
    return <h1 className="text-xl text-red-600">Something went wrong, refresh the page</h1>
  }

  const todos = data ? data.data : []

  const filteredTodos = todos.filter((e) => {
    const text = (e.name + ' ' + e.description).toLowerCase()
    const bySearch = text.includes(search.toLowerCase())
    let byStatus = true
    if (status === 'completed') {
      byStatus = e.isCompleted
    }
    if (status === 'notCompleted') {
      byStatus = !e.isCompleted
    }
    return bySearch && byStatus
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Async3 - Todos</h1>

      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
        <h2 className="text-lg font-bold">Add todo</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="border rounded px-3 py-2"
        />
        <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          add
        </button>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded px-3 py-2 bg-white"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2 bg-white"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredTodos.map((e) => {
          return (
            <div key={e.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              {e.images.length > 0 && (
                <img src={IMAGE_URL + e.images[0].imageName} alt={e.name} className="w-full h-40 object-cover rounded" />
              )}

              {editId === e.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(event) => setEditDescription(event.target.value)}
                    className="border rounded px-3 py-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    >
                      save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
                    >
                      cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{e.name}</h3>
                  <p className="text-gray-600">{e.description}</p>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={e.isCompleted} onChange={() => handleComplete(e.id)} />
                    {e.isCompleted ? 'Completed' : 'Not completed'}
                  </label>
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
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Async3
