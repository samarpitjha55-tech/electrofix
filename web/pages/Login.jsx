import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { AlertCircle, Loader } from 'lucide-react'

export default function Login({ setCurrentPage }) {
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await signIn(formData.email, formData.password)
      setCurrentPage('home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <section className="section">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Welcome Back</h2>

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

              <button
                type="submit"
                disabled={loading || !formData.email || !formData.password}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                {loading ? (
                  <>
                    <Loader size={18} className="spinner" style={{ display: 'inline-block' }} />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="auth-footer">
              Don't have an account?{' '}
              <a onClick={() => setCurrentPage('register')}>
                Create one
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
