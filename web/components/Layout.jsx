import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Menu, X, LogOut, User } from 'lucide-react'
import './Layout.css'

export default function Layout({ children, currentPage, setCurrentPage }) {
  const { user, profile, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      setCurrentPage('home')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    ...(user ? [
      { label: 'Book Service', page: 'booking' },
      { label: 'My Dashboard', page: 'dashboard' },
    ] : []),
    ...(profile?.role === 'admin' ? [
      { label: 'Admin Panel', page: 'admin' },
    ] : []),
    { label: 'Contact', page: 'contact' },
  ]

  return (
    <div className="app-layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo" onClick={() => setCurrentPage('home')}>
              <span className="logo-icon">⚡</span>
              <span className="logo-text">ElectroWorks</span>
            </div>

            <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
              {navItems.map((item) => (
                <button
                  key={item.page}
                  className={`nav-link ${currentPage === item.page ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage(item.page)
                    setMobileMenuOpen(false)
                  }}
                >
                  {item.label}
                </button>
              ))}
              {user ? (
                <div className="user-menu">
                  <span className="user-name">{profile?.full_name || user.email}</span>
                  <button className="btn btn-primary btn-small" onClick={handleSignOut}>
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <button
                    className="btn btn-outline btn-small"
                    onClick={() => setCurrentPage('login')}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-primary btn-small"
                    onClick={() => setCurrentPage('register')}
                  >
                    Register
                  </button>
                </div>
              )}
            </nav>

            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>ElectroWorks</h4>
              <p>Professional electrical services and support for your home and business.</p>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('services') }}>Installation</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('services') }}>Maintenance</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('services') }}>Repair</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('services') }}>Emergency</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Phone: 1-800-ELECTRIC</p>
              <p>Email: support@electroworks.com</p>
              <p>Available 24/7</p>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ElectroWorks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
