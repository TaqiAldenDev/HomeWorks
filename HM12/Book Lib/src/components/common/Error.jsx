const Error = ({ message = 'Something went wrong', onRetry }) => (
  <div className="text-center py-5">
    <span className="material-symbols-outlined text-error-custom mb-3 d-inline-block" style={{ fontSize: 48 }}>error</span>
    <div className="d-inline-block text-start px-4 py-3 mb-3 rounded-3" style={{ background: 'rgba(147, 0, 10, 0.1)', border: '1px solid rgba(255, 180, 171, 0.2)' }}>
      <p className="mb-0 text-error-custom fw-semibold">{message}</p>
    </div>
    {onRetry && (
      <div>
        <button onClick={onRetry} className="btn-retry">Try Again</button>
      </div>
    )}
  </div>
)

export default Error
