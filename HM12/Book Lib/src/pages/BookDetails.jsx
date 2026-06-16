import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'

const BookDetails = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [related, setRelated] = useState([])

  const loadBook = (bookId) => {
    api.book(bookId)
      .then(data => {
        setBook(data)
        setError(null)
        if (data.title) {
          const words = data.title.split(' ').slice(0, 3).join(' ')
          api.search(words).then(d => setRelated(d.books?.slice(0, 4) || [])).catch(() => {})
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  const handleRetry = () => { setLoading(true); setError(null); loadBook(id) }

  useEffect(() => {
    if (id) loadBook(id)
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return <div className="container-custom py-5"><Loading /></div>
  if (error) return <div className="container-custom py-5"><Error message={error} onRetry={handleRetry} /></div>
  if (!book) return null

  const coverSrc = book.image || book.cover

  return (
    <div className="page-enter">
      <div className="container-custom py-5">
        <div className="breadcrumb-custom mb-4">
          <Link to="/">Library</Link>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
          <span className="current">{book.title}</span>
        </div>

        <div className="row g-5">
          <div className="col-lg-4 d-flex flex-column align-items-center align-items-lg-start gap-3">
            <div className="aspect-3-4 rounded-3 overflow-hidden cyan-glow w-100" style={{ maxWidth: 320 }}>
              {coverSrc ? (
                <img className="w-100 h-100 object-fit-cover" src={coverSrc} alt={book.title} />
              ) : (
                <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-surface-container-high-custom">
                  <span className="material-symbols-outlined text-on-surface-variant-custom" style={{ fontSize: 48 }}>auto_stories</span>
                </div>
              )}
            </div>
            {book.download && (
              <a href={book.download} target="_blank" rel="noopener noreferrer" className="btn-download w-100" style={{ maxWidth: 320 }}>
                <span className="material-symbols-outlined">download</span> Download PDF
              </a>
            )}
          </div>

          <div className="col-lg-8 d-flex flex-column gap-4">
            <div className="d-flex flex-column gap-1">
              <h1 className="display-headline text-primary-custom text-balance">{book.title}</h1>
              {book.subtitle && <h2 className="heading-md text-on-surface-custom fst-italic">{book.subtitle}</h2>}
              <p className="body-text text-on-surface-variant-custom mt-2">
                by <span className="text-primary-custom fw-semibold">{book.authors || 'Unknown Author'}</span>
              </p>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {book.year && (
                  <span className="metadata-chip">
                    <span className="material-symbols-outlined">calendar_today</span> {book.year} Edition
                  </span>
                )}
                <span className="metadata-chip">
                  <span className="material-symbols-outlined">language</span> English
                </span>
                {book.pages && (
                  <span className="metadata-chip">
                    <span className="material-symbols-outlined">description</span> {book.pages} Pages
                  </span>
                )}
                <span className="metadata-chip">
                  <span className="material-symbols-outlined">extension</span> PDF, EPUB
                </span>
              </div>
            </div>

            <div>
              <h3 className="heading-md text-primary-custom pb-2 text-balance" style={{ borderBottom: '1px solid var(--outline-variant)' }}>Overview</h3>
              <p className="body-text text-on-surface-variant-custom lh-lg mt-3">
                {book.description || 'No description available.'}
              </p>
            </div>

            {book.publisher && (
              <div>
                <h3 className="heading-md text-primary-custom pb-2 text-balance" style={{ borderBottom: '1px solid var(--outline-variant)' }}>Details</h3>
                <div className="row g-3 mt-2">
                  {book.publisher && (
                    <div className="col-6 col-md-4">
                      <div className="detail-panel">
                        <p className="label-text text-on-surface-variant-custom mb-0">Publisher</p>
                        <p className="body-base text-on-surface-custom fw-semibold mb-0">{book.publisher}</p>
                      </div>
                    </div>
                  )}
                  {book.isbn && (
                    <div className="col-6 col-md-4">
                      <div className="detail-panel">
                        <p className="label-text text-on-surface-variant-custom mb-0">ISBN</p>
                        <p className="body-base text-on-surface-custom fw-semibold mb-0">{book.isbn}</p>
                      </div>
                    </div>
                  )}
                  {book.year && (
                    <div className="col-6 col-md-4">
                      <div className="detail-panel">
                        <p className="label-text text-on-surface-variant-custom mb-0">Year</p>
                        <p className="body-base text-on-surface-custom fw-semibold mb-0">{book.year}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-5">
            <div className="d-flex justify-content-between align-items-end mb-3">
              <div>
                <h3 className="heading-lg text-primary-custom text-balance">Related Books</h3>
                <p className="body-base text-on-surface-variant-custom">Recommended based on your interest.</p>
              </div>
            </div>
            <div className="d-flex gap-3 overflow-x-auto pb-3 custom-scrollbar">
              {related.map((r) => (
                <Link key={r.id} to={`/book/${r.id}`} className="related-book">
                  <div className="related-cover aspect-3-4 cyan-glow-hover w-100" style={{ minWidth: 200 }}>
                    {r.image ? (
                      <img className="w-100 h-100 object-fit-cover" src={r.image} alt={r.title} loading="lazy" />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-surface-container-high-custom">
                        <span className="material-symbols-outlined text-on-surface-variant-custom" style={{ fontSize: 32 }}>auto_stories</span>
                      </div>
                    )}
                  </div>
                  <p className="related-title line-clamp-1 mb-0">{r.title}</p>
                  <p className="label-text text-on-surface-variant-custom line-clamp-1 mb-0">{r.authors || 'Unknown Author'}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default BookDetails
