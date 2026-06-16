const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="aspect-3-4 skeleton mb-2" />
    <div className="skeleton" style={{ height: 16, width: '75%', marginBottom: 8 }} />
    <div className="skeleton" style={{ height: 14, width: '50%', marginBottom: 12 }} />
    <div className="skeleton" style={{ height: 40, width: '100%', borderRadius: '0.5rem' }} />
  </div>
)

const Loading = () => (
  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="col"><SkeletonCard /></div>
    ))}
  </div>
)

export default Loading
