import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function Register({ setCurrentPage }) {
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await signUp(formData.email, formData.password, formData.full_name)
      setSuccess(true)
      setTimeout(() => setCurrentPage('login'), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="page">
        <section className="section">
          <div className="auth-container">
            <div className="auth-card">
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={48} style={{ color: 'var(--success)', margin: '0 auto 1rem' }} />
                <h2 style={{ color: 'var(--success)' }}>Account Created!</h2>
                <p>Redirecting to login...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="section">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Create Account</h2>

            {error && (
              <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <AlertCircle size={20} />
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !formData.full_name || !formData.email || !formData.password}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="auth-footer">
              Already have an account?{' '}
              <a onClick={() => setCurrentPage('login')}>
                Sign in
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
