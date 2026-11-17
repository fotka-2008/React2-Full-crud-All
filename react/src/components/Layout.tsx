import { NavLink, Outlet } from 'react-router'

const Layout = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'font-bold underline' : '')

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white">
        <nav className="max-w-3xl mx-auto flex flex-wrap gap-4 p-4">
          <NavLink to="/async1" className={linkClass}>Async1</NavLink>
          <NavLink to="/async2" className={linkClass}>Async2</NavLink>
          <NavLink to="/async3" className={linkClass}>Async3</NavLink>
          <NavLink to="/category-redux" className={linkClass}>Category Redux</NavLink>
          <NavLink to="/category-zustand" className={linkClass}>Category Zustand</NavLink>
          <NavLink to="/category-jotai" className={linkClass}>Category Jotai</NavLink>
        </nav>
      </header>
      <main className="max-w-3xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
