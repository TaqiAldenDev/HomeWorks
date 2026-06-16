import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { categories } from '../data/categories'
import BookList from '../components/books/BookList'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'

const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [catCounts, setCatCounts] = useState({})
  const catCountsArr = Object.values(catCounts)
  const totalCollection = catCountsArr.length > 0 ? catCountsArr.reduce((a, b) => a + b, 0) : null

  const loadBooks = () => {
    api.getRecent()
      .then(data => { setBooks(data.books || []); setError(null) })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadBooks() }, [])

  useEffect(() => {
    const fetchCounts = async () => {
      const results = {}
      await Promise.all(categories.map(async (cat) => {
        try { const d = await api.search(cat.query); results[cat.slug] = d.books?.length || 0 }
        catch { results[cat.slug] = 0 }
      }))
      setCatCounts(results)
    }
    fetchCounts()
  }, [])

  const handleRetry = () => { setLoading(true); setError(null); loadBooks() }

  return (
    <>
      <section className="hero-section">
        <div className="container-custom w-100">
          <div className="hero-headline">
            <h1 className="display-headline text-balance mb-4">
              <span className="text-primary-container-custom">Computer Science</span><br />
              <span className="text-on-surface-custom">Books</span>
            </h1>
            <p className="body-text text-on-surface-variant-custom mb-4" style={{ maxWidth: 640 }}>
              Explore a curated collection of free computer science books from dBooks.org.
              A premium repository designed for the deep technical needs of modern engineers and researchers.
            </p>
            <div className="glass-card rounded-3 px-4 py-3 d-inline-flex flex-column flex-md-row gap-0 align-items-stretch">
              <div className="hero-stat">
                <p className="hero-stat-value">{books.length > 0 ? books.length : '...'}</p>
                <p className="hero-stat-label">Featured Books</p>
              </div>
              <div className="stat-divider" />
              <div className="hero-stat">
                <p className="hero-stat-value">{categories.length}</p>
                <p className="hero-stat-label">Categories</p>
              </div>
              <div className="stat-divider" />
              <div className="hero-stat">
                <p className="hero-stat-value">{totalCollection !== null ? totalCollection.toLocaleString() : '...'}</p>
                <p className="hero-stat-label">Total Collection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-surface py-5">
        <div className="container-custom">
          <h2 className="heading-lg section-underline text-balance mb-4">Explore by Category</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 g-3">
            {categories.map((cat, i) => (
              <div key={cat.slug} className="col">
                <Link to={`/category/${cat.slug}`} className="text-decoration-none">
                  <div className="glass-card p-3 rounded-3 category-card">
                    <div className="category-icon mb-3" style={{ background: '#58a6ff' }}>
                      <span className="material-symbols-outlined" style={{ color: '#fff' }}>{cat.icon}</span>
                    </div>
                    <h3 className="body-base fw-bold mb-1 text-on-surface-custom">{cat.label}</h3>
                    <p className="label-text text-on-surface-variant-custom mb-0">
                      {catCounts[cat.slug] !== undefined ? `${catCounts[cat.slug]} books` : '...'}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-surface-lowest py-5">
        <div className="container-custom">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h2 className="heading-lg section-underline text-balance mb-0">Featured Books</h2>
            <Link to="/categories" className="text-primary-custom label-text text-decoration-none">View all books &rarr;</Link>
          </div>
          {loading && <Loading />}
          {error && <Error message={error} onRetry={handleRetry} />}
          {!loading && !error && <BookList books={books.slice(0, 8)} />}
        </div>
      </section>

      <section className="section-surface py-5">
        <div className="container-custom">
          <div className="glass-card rounded-4 p-4 p-md-5 d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 position-relative overflow-hidden">
            <div className="cta-glow" />
            <div className="position-relative" style={{ zIndex: 1 }}>
              <h2 className="heading-lg text-balance mb-2">Contribute to the Library</h2>
              <p className="body-text text-on-surface-variant-custom mb-0" style={{ maxWidth: 560 }}>
                Found a great free book that's missing from our collection? Help the community by submitting new resources to our open-source library.
              </p>
            </div>
            <a href="https://www.dbooks.org" target="_blank" rel="noopener noreferrer" className="btn-highlight text-decoration-none px-4 py-3 text-nowrap position-relative" style={{ zIndex: 1 }}>
              Submit a Book
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
