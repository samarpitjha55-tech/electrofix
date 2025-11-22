import React, { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import { useAuth } from './contexts/AuthContext'

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  const isAdmin = profile?.role === 'admin'
  const isAuthenticated = !!user

  const renderPage = () => {
    if (currentPage === 'login') return <Login setCurrentPage={setCurrentPage} />
    if (currentPage === 'register') return <Register setCurrentPage={setCurrentPage} />
    if (currentPage === 'services') return <Services />
    if (currentPage === 'booking' && isAuthenticated) return <Booking />
    if (currentPage === 'contact') return <Contact />
    if (currentPage === 'dashboard' && isAuthenticated) return <Dashboard />
    if (currentPage === 'admin' && isAdmin) return <Admin />
    return <Home setCurrentPage={setCurrentPage} />
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
