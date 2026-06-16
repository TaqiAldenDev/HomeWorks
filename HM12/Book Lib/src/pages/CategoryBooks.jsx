import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import { categories } from '../data/categories'
import BookList from '../components/books/BookList'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'

const CategoryBooks = () => {
  const { slug } = useParams()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const category = categories.find((c) => c.slug === slug)

  const handleRetry = () => { setLoading(true); setError(null); setRetryCount(c => c + 1) }

  useEffect(() => {
    const cat = categories.find(c => c.slug === slug)
    const q = cat?.query || slug
    api.search(q)
      .then(data => { setBooks(data.books || []); setError(null) })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
    window.scrollTo(0, 0)
  }, [slug, retryCount])

  return (
    <div className="container-custom py-5 page-enter">
      <div className="mb-3">
        <Link to="/categories" className="text-primary-custom label-text text-decoration-none">&larr; All Categories</Link>
        <span className="mx-2 text-on-surface-variant-custom opacity-50">/</span>
        <span className="text-on-surface-variant-custom opacity-50">{category?.label || slug}</span>
      </div>
      <div className="text-center mb-5">
        <h2 className="heading-lg section-underline text-balance" style={{ display: 'inline-block' }}>{category?.label || slug}</h2>
        {!loading && !error && (
          <p className="text-on-surface-variant-custom body-base mt-2">{books.length} {books.length === 1 ? 'book' : 'books'} found</p>
        )}
      </div>
      {loading && <Loading />}
      {error && <Error message={error} onRetry={handleRetry} />}
      {!loading && !error && <BookList books={books} />}
    </div>
  )
}

export default CategoryBooks
