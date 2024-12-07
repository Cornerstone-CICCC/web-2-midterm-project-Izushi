import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; Movie App. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/" className="footer-link">Home</a>
          <a href="/about" className="footer-link">About</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer