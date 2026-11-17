import { create } from 'zustand'

export interface ICategory {
  id: number
  name: string
  type: string
}

interface ICategoryStore {
  categories: ICategory[]
  addCategory: (category: ICategory) => void
  editCategory: (category: ICategory) => void
  deleteCategory: (id: number) => void
}

export const useCategoryStore = create<ICategoryStore>((set) => ({
  categories: [
    { id: 1, name: 'Laptops', type: 'Electronics' },
    { id: 2, name: 'Vegetables', type: 'Food' },
    { id: 3, name: 'Jeans', type: 'Clothes' },
  ],
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
  editCategory: (category) =>
    set((state) => ({ categories: state.categories.map((e) => (e.id === category.id ? category : e)) })),
  deleteCategory: (id) => set((state) => ({ categories: state.categories.filter((e) => e.id !== id) })),
}))
