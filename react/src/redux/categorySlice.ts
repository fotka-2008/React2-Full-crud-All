import { createSlice } from '@reduxjs/toolkit'

export interface ICategory {
  id: number
  name: string
  type: string
}

const initialState: ICategory[] = [
  { id: 1, name: 'Phones', type: 'Electronics' },
  { id: 2, name: 'Fruits', type: 'Food' },
  { id: 3, name: 'T-shirts', type: 'Clothes' },
]

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload)
    },
    editCategory: (state, action) => {
      return state.map((e) => (e.id === action.payload.id ? action.payload : e))
    },
    deleteCategory: (state, action) => {
      return state.filter((e) => e.id !== action.payload)
    },
  },
})

export const { addCategory, editCategory, deleteCategory } = categorySlice.actions
export default categorySlice.reducer
