import BookCard from './BookCard'

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="empty-state-icon mb-3">
          <span className="material-symbols-outlined" style={{ fontSize: 64 }}>auto_stories</span>
        </div>
        <h5 className="text-on-surface-variant-custom fw-semibold">No books found</h5>
        <p className="text-on-surface-variant-custom label-text opacity-75">Try a different search term or check back later.</p>
      </div>
    )
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
      {books.map((book) => (
        <div key={book.id} className="col fade-in-up">
          <BookCard book={book} />
        </div>
      ))}
    </div>
  )
}

export default BookList
