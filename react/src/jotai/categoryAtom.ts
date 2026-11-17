import { atom } from 'jotai'

export interface ICategory {
  id: number
  name: string
  type: string
}

export const categoriesAtom = atom<ICategory[]>([
  { id: 1, name: 'Headphones', type: 'Electronics' },
  { id: 2, name: 'Bread', type: 'Food' },
  { id: 3, name: 'Shoes', type: 'Clothes' },
])
