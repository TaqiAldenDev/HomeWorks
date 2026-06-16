import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <nav className="navbar navbar-glass fixed-top py-0">
      <div className="container-custom d-flex align-items-center justify-content-between" style={{ height: 64 }}>
        <div className="d-flex align-items-center gap-4">
          <Link to="/" className="nav-brand">CS Books</Link>

        </div>
        <div className="d-flex align-items-center gap-3 flex-shrink-1 justify-content-end">
          <form onSubmit={handleSubmit} className="d-none d-sm-block nav-search-form">
            <span className="material-symbols-outlined nav-search-icon">search</span>
            <input
              className="nav-search-input"
              placeholder="Search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <Link to="/categories" className="btn-outline-accent text-decoration-none">Categories</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
