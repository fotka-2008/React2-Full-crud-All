import { useState } from 'react'
import {
  useAddTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from '../../api/todo'
import type { ITodo } from '../../api/todo.type'

const Async2 = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const { data, isLoading, isError, refetch } = useGetTodosQuery(search)
  const [addFn] = useAddTodoMutation()
  const [updateFn] = useUpdateTodoMutation()
  const [deleteFn] = useDeleteTodoMutation()
  const [completeFn] = useCompleteTodoMutation()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [editId, setEditId] = useState<number | null>(null)

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
    setName(todo.name)
    setDescription(todo.description)
  }

  const handleUpdate = async () => {
    if (editId === null) {
      return
    }
    if (!name || !description) {
      alert('Fill name and description')
      return
    }
    await updateFn({ id: editId, name: name, description: description })
    refetch()
    setEditId(null)
    setName('')
    setDescription('')
  }

  const handleCancel = () => {
    setEditId(null)
    setName('')
    setDescription('')
  }

  const handleDelete = async (id: number) => {
    await deleteFn(id)
    refetch()
  }

  const handleComplete = async (id: number) => {
    await completeFn(id)
    refetch()
  }

  const todos = data ? data.data : []

  const filteredTodos = todos.filter((e) => {
    if (status === 'completed') {
      return e.isCompleted
    }
    if (status === 'notCompleted') {
      return !e.isCompleted
    }
    return true
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Async2 - Todos (search from API)</h1>

      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
        <h2 className="text-lg font-bold">{editId === null ? 'Add todo' : 'Edit todo'}</h2>
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
        {editId === null && (
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="border rounded px-3 py-2"
          />
        )}
        {editId === null ? (
          <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            add
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              save
            </button>
            <button onClick={handleCancel} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
              cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search..."
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

      {isLoading && <h1 className="text-xl">Loading...</h1>}
      {isError && <h1 className="text-xl text-red-600">Something went wrong, refresh the page</h1>}

      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((e) => {
            return (
              <tr key={e.id} className="border-b">
                <td className="p-3 font-semibold">{e.name}</td>
                <td className="p-3 text-gray-600">{e.description}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleComplete(e.id)}
                    className={e.isCompleted ? 'text-green-600' : 'text-gray-500'}
                  >
                    {e.isCompleted ? 'Completed' : 'Not completed'}
                  </button>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(e)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Async2
