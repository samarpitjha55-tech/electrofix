import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { AlertCircle } from 'lucide-react'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('bookings')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let queryData

        if (activeTab === 'bookings') {
          const { data: d, error: e } = await supabase
            .from('bookings')
            .select('*, services(name), profiles:customer_id(full_name, email)')
            .order('created_at', { ascending: false })
          queryData = d
          if (e) throw e
        } else if (activeTab === 'tickets') {
          const { data: d, error: e } = await supabase
            .from('support_tickets')
            .select('*, profiles:customer_id(full_name, email)')
            .order('created_at', { ascending: false })
          queryData = d
          if (e) throw e
        } else if (activeTab === 'services') {
          const { data: d, error: e } = await supabase
            .from('services')
            .select('*, service_categories(name)')
          queryData = d
          if (e) throw e
        } else if (activeTab === 'reviews') {
          const { data: d, error: e } = await supabase
            .from('reviews')
            .select('*, profiles:customer_id(full_name)')
            .order('created_at', { ascending: false })
          queryData = d
          if (e) throw e
        }

        setData(queryData || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  const updateBookingStatus = async (id, status) => {
    try {
      const { error: e } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)

      if (e) throw e

      setData(data.map(item => item.id === id ? { ...item, status } : item))
    } catch (err) {
      setError(err.message)
    }
  }

  const updateTicketStatus = async (id, status) => {
    try {
      const { error: e } = await supabase
        .from('support_tickets')
        .update({ status })
        .eq('id', id)

      if (e) throw e

      setData(data.map(item => item.id === id ? { ...item, status } : item))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page">
      <section className="section">
        <div className="admin-container">
          <h1 className="section-title">Admin Dashboard</h1>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <AlertCircle size={20} />
                {error}
              </div>
            </div>
          )}

          <div className="admin-tabs">
            {['bookings', 'tickets', 'services', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="admin-content">
            {loading ? (
              <div className="text-center">
                <div className="spinner"></div>
                <p>Loading...</p>
              </div>
            ) : data.length === 0 ? (
              <p className="text-center text-muted">No data to display</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      {activeTab === 'bookings' && (
                        <>
                          <th>Customer</th>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </>
                      )}
                      {activeTab === 'tickets' && (
                        <>
                          <th>Customer</th>
                          <th>Subject</th>
                          <th>Priority</th>
                          <th>Status</th>
                          <th>Action</th>
                        </>
                      )}
                      {activeTab === 'services' && (
                        <>
                          <th>Service Name</th>
                          <th>Category</th>
                          <th>Price Range</th>
                          <th>Available</th>
                        </>
                      )}
                      {activeTab === 'reviews' && (
                        <>
                          <th>Customer</th>
                          <th>Rating</th>
                          <th>Comment</th>
                          <th>Date</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(item => (
                      <tr key={item.id}>
                        {activeTab === 'bookings' && (
                          <>
                            <td>{item.profiles?.full_name}</td>
                            <td>{item.services?.name}</td>
                            <td>{new Date(item.booking_date).toLocaleDateString()}</td>
                            <td>{item.status}</td>
                            <td>
                              <select
                                value={item.status}
                                onChange={(e) => updateBookingStatus(item.id, e.target.value)}
                                style={{ padding: '0.25rem', fontSize: '0.875rem' }}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </>
                        )}
                        {activeTab === 'tickets' && (
                          <>
                            <td>{item.profiles?.full_name}</td>
                            <td>{item.subject}</td>
                            <td>{item.priority}</td>
                            <td>{item.status}</td>
                            <td>
                              <select
                                value={item.status}
                                onChange={(e) => updateTicketStatus(item.id, e.target.value)}
                                style={{ padding: '0.25rem', fontSize: '0.875rem' }}
                              >
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                          </>
                        )}
                        {activeTab === 'services' && (
                          <>
                            <td>{item.name}</td>
                            <td>{item.service_categories?.name}</td>
                            <td>${item.price_min} - ${item.price_max}</td>
                            <td>{item.is_available ? 'Yes' : 'No'}</td>
                          </>
                        )}
                        {activeTab === 'reviews' && (
                          <>
                            <td>{item.profiles?.full_name}</td>
                            <td>
                              <span style={{ color: 'var(--warning)' }}>
                                {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                              </span>
                            </td>
                            <td>{item.comment?.substring(0, 50)}...</td>
                            <td>{new Date(item.created_at).toLocaleDateString()}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
