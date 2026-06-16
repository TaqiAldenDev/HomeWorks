import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { categories } from '../data/categories'

const Categories = () => {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    const fetchCounts = async () => {
      const results = {}
      await Promise.all(categories.map(async (cat) => {
        try { const d = await api.search(cat.query); results[cat.slug] = d.books?.length || 0 }
        catch { results[cat.slug] = '...' }
      }))
      setCounts(results)
    }
    fetchCounts()
  }, [])

  return (
    <div className="container-custom py-5 page-enter">
      <div className="text-center mb-5">
        <h2 className="heading-lg section-underline text-balance" style={{ display: 'inline-block' }}>Categories</h2>
        <p className="text-on-surface-variant-custom body-base mt-2">Browse computer science books by topic</p>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
        {categories.map((cat, i) => (
          <div key={cat.slug} className="col">
            <Link to={`/category/${cat.slug}`} className="text-decoration-none">
              <div className="glass-card p-3 rounded-3 category-card h-100">
                <div className="category-icon mb-3" style={{ background: '#58a6ff' }}>
                  <span className="material-symbols-outlined" style={{ color: '#fff' }}>{cat.icon}</span>
                </div>
                <h3 className="body-base fw-bold mb-1 text-on-surface-custom">{cat.label}</h3>
                <p className="label-text text-on-surface-variant-custom mb-0">
                  {counts[cat.slug] !== undefined ? `${counts[cat.slug]} books` : '...'}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
