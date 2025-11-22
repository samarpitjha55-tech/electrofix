import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, DollarSign, AlertCircle } from 'lucide-react'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*, services(name, price_min, price_max)')
          .eq('customer_id', user.id)
          .order('booking_date', { ascending: false })

        if (bookingsError) throw bookingsError

        setBookings(bookingsData || [])

        const total = bookingsData?.length || 0
        const pending = bookingsData?.filter(b => b.status === 'pending').length || 0
        const completed = bookingsData?.filter(b => b.status === 'completed').length || 0

        setStats({ total, pending, completed })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchData()
  }, [user])

  const getStatusClass = (status) => {
    return `status-${status}`
  }

  if (loading) {
    return (
      <div className="page">
        <div className="container text-center">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="section">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>Welcome, {profile?.full_name || 'Customer'}</h1>
            <p className="text-muted">Manage your bookings and service requests</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <AlertCircle size={20} />
                {error}
              </div>
            </div>
          )}

          <div className="dashboard-grid">
            <div className="stat-card">
              <div className="stat-label">Total Bookings</div>
              <div className="stat-value">{stats.total}</div>
            </div>

            <div className="stat-card" style={{ borderLeftColor: 'var(--warning)' }}>
              <div className="stat-label">Pending</div>
              <div className="stat-value" style={{ color: 'var(--warning)' }}>{stats.pending}</div>
            </div>

            <div className="stat-card" style={{ borderLeftColor: 'var(--success)' }}>
              <div className="stat-label">Completed</div>
              <div className="stat-value" style={{ color: 'var(--success)' }}>{stats.completed}</div>
            </div>

            <div className="stat-card" style={{ borderLeftColor: 'var(--accent)' }}>
              <div className="stat-label">Active</div>
              <div className="stat-value" style={{ color: 'var(--accent)' }}>
                {bookings.filter(b => b.status === 'confirmed' || b.status === 'in_progress').length}
              </div>
            </div>
          </div>

          <h2 className="mt-4 mb-2">Your Bookings</h2>

          {bookings.length === 0 ? (
            <div className="card text-center">
              <p className="text-muted">No bookings yet</p>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                Book a service to get started
              </p>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map(booking => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-info">
                    <h4>{booking.services?.name}</h4>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--neutral-500)', marginTop: '0.5rem' }}>
                      <span>
                        <Calendar size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </span>
                      <span>{booking.start_time}</span>
                      <span>{booking.location}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span className={`booking-status ${getStatusClass(booking.status)}`}>
                      {booking.status}
                    </span>
                    {booking.final_cost && (
                      <div style={{ fontWeight: 600, color: 'var(--primary)' }}>
                        ${booking.final_cost}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <h2 className="mt-4 mb-2">Support</h2>
          <div className="card">
            <p>Need help? <a href="#contact" style={{ color: 'var(--primary)', fontWeight: 500 }}>Contact our support team</a></p>
          </div>
        </div>
      </section>
    </div>
  )
}
