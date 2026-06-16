const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-custom d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div className="d-flex flex-column align-items-center align-items-md-start gap-1">
          <span className="heading-md fw-bold text-on-surface-custom">CS Books</span>
          <p className="label-text text-on-surface-variant-custom text-center text-md-start opacity-75 mb-0">
            &copy; {new Date().getFullYear()} CS Books Digital Library. Built for engineers.
          </p>
        </div>
        <div className="d-flex gap-3 flex-wrap justify-content-center">
          <span className="footer-link">About</span>
          <span className="footer-link">Documentation</span>
          <span className="footer-link">Privacy Policy</span>
          <span className="footer-link">Terms of Service</span>
          <span className="footer-link">Support</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
