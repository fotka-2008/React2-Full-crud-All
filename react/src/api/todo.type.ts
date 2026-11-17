export interface IImage {
  id: number
  imageName: string
}

export interface ITodo {
  id: number
  isCompleted: boolean
  images: IImage[]
  name: string
  description: string
}

export interface IResponse {
  data: ITodo[]
  errors: string[]
  statusCode: number
}

export interface IUpdateTodo {
  id: number
  name: string
  description: string
}
