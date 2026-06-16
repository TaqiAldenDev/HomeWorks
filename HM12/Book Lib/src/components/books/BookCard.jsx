import { Link } from 'react-router-dom'

const BookCard = ({ book }) => {
  const coverSrc = book.image || book.cover
  const author = book.authors || 'Unknown Author'

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="text-decoration-none d-block">
        <div className="book-card-cover bg-surface-container-high-custom">
          {coverSrc ? (
            <img className="w-100 h-100 object-fit-cover" src={coverSrc} alt={book.title} loading="lazy" />
          ) : (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center text-on-surface-variant-custom">
              <span className="material-symbols-outlined" style={{ fontSize: 48 }}>auto_stories</span>
            </div>
          )}
          <div className="cover-overlay" />
        </div>
      </Link>
      <h3 className="book-card-title body-base fw-bold text-on-surface-custom line-clamp-1 mt-2 mb-0">
        <Link to={`/book/${book.id}`} className="text-decoration-none text-inherit">{book.title}</Link>
      </h3>
      <p className="label-text text-on-surface-variant-custom line-clamp-1 mb-2">{author}</p>
      <Link to={`/book/${book.id}`} className="btn-gradient d-block w-100 text-center text-decoration-none py-2">
        View Details
      </Link>
    </div>
  )
}

export default BookCard
