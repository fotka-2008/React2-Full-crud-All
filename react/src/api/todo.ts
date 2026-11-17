import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IResponse, IUpdateTodo } from './todo.type'

export const IMAGE_URL = 'https://to-dos-api.softclub.tj/images/'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://to-dos-api.softclub.tj' }),
  endpoints: (build) => ({
    getTodos: build.query<IResponse, string>({
      query: (search) => `/api/to-dos?query=${search}`,
    }),
    addTodo: build.mutation<IResponse, FormData>({
      query: (formData) => ({
        url: '/api/to-dos',
        method: 'POST',
        body: formData,
      }),
    }),
    updateTodo: build.mutation<IResponse, IUpdateTodo>({
      query: (todo) => ({
        url: '/api/to-dos',
        method: 'PUT',
        body: todo,
      }),
    }),
    deleteTodo: build.mutation<IResponse, number>({
      query: (id) => ({
        url: `/api/to-dos?id=${id}`,
        method: 'DELETE',
      }),
    }),
    completeTodo: build.mutation<IResponse, number>({
      query: (id) => ({
        url: `/completed?id=${id}`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
} = todoApi
