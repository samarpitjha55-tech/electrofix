import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function Booking() {
  const { user } = useAuth()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [formData, setFormData] = useState({
    service_id: '',
    booking_date: '',
    start_time: '',
    location: '',
    notes: '',
  })

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, name, price_min, price_max, duration_hours')
          .eq('is_available', true)

        if (error) throw error
        setServices(data || [])
      } catch (err) {
        setMessage({ type: 'error', text: err.message })
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          customer_id: user.id,
          service_id: formData.service_id,
          booking_date: formData.booking_date,
          start_time: formData.start_time,
          location: formData.location,
          notes: formData.notes,
          status: 'pending',
        })

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Booking submitted successfully! We will confirm your appointment shortly.'
      })
      setFormData({
        service_id: '',
        booking_date: '',
        start_time: '',
        location: '',
        notes: '',
      })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="container text-center">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const selectedService = services.find(s => s.id === formData.service_id)

  return (
    <div className="page">
      <section className="section">
        <div className="booking-container">
          <h1 className="section-title">Book a Service</h1>

          {message && (
            <div className={`alert alert-${message.type}`} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {message.text}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-section">
              <h3>Select Service</h3>

              <div className="form-group">
                <label className="form-label">Service *</label>
                <select
                  name="service_id"
                  value={formData.service_id}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Choose a service...</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ${service.price_min} - ${service.price_max}
                    </option>
                  ))}
                </select>
              </div>

              {selectedService && (
                <div className="card" style={{ marginTop: '1rem', backgroundColor: '#f0f9ff', borderLeft: '4px solid var(--primary)' }}>
                  <p><strong>Duration:</strong> ~{selectedService.duration_hours} hours</p>
                  <p><strong>Price Range:</strong> ${selectedService.price_min} - ${selectedService.price_max}</p>
                </div>
              )}
            </div>

            <div className="form-section">
              <h3>Schedule</h3>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time *</label>
                  <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Location & Notes</h3>

              <div className="form-group">
                <label className="form-label">Service Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special requirements or details we should know?"
                  className="form-textarea"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !formData.service_id || !formData.booking_date || !formData.start_time || !formData.location}
              className="btn btn-primary btn-large"
              style={{ width: '100%' }}
            >
              {submitting ? 'Submitting...' : 'Book Service'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
