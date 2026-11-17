import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Layout from '../components/Layout'
import Async1 from '../pages/Async1/Async1'
import Async2 from '../pages/Async2/Async2'
import Async3 from '../pages/Async3/Async3'
import CategoryRedux from '../pages/CategoryRedux/CategoryRedux'
import CategoryZustand from '../pages/CategoryZustand/CategoryZustand'
import CategoryJotai from '../pages/CategoryJotai/CategoryJotai'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/async1" />} />
          <Route path="async1" element={<Async1 />} />
          <Route path="async2" element={<Async2 />} />
          <Route path="async3" element={<Async3 />} />
          <Route path="category-redux" element={<CategoryRedux />} />
          <Route path="category-zustand" element={<CategoryZustand />} />
          <Route path="category-jotai" element={<CategoryJotai />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
