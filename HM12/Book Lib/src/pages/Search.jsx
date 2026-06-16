import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import BookList from '../components/books/BookList'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'

const Search = () => {
  const { query } = useParams()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const searchBooks = (q) => {
    api.search(q)
      .then(data => { setBooks(data.books || []); setError(null) })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  const handleRetry = () => { setLoading(true); setError(null); searchBooks(query) }

  useEffect(() => {
    if (query) searchBooks(query)
    window.scrollTo(0, 0)
  }, [query])

  return (
    <div className="container-custom py-5 page-enter">
      <div className="mb-3">
        <Link to="/" className="text-primary-custom label-text text-decoration-none">&larr; Back to Home</Link>
      </div>
      <div className="text-center mb-5">
        <h2 className="heading-lg section-underline text-balance" style={{ display: 'inline-block' }}>Search Results</h2>
        <p className="text-on-surface-variant-custom body-base mt-2 mb-0">
          Showing results for &ldquo;<span className="text-primary-custom fw-semibold">{query}</span>&rdquo;
          {!loading && !error && <span className="text-on-surface-variant-custom ms-2 opacity-50">({books.length} found)</span>}
        </p>
      </div>
      {loading && <Loading />}
      {error && <Error message={error} onRetry={handleRetry} />}
      {!loading && !error && <BookList books={books} />}
    </div>
  )
}

export default Search
