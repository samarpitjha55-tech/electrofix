import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function Contact() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('support_tickets')
        .insert({
          customer_id: user?.id,
          subject: formData.subject,
          description: formData.description,
          status: 'open',
          priority: 'medium',
        })

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Your message has been received! We will respond within 2 hours.'
      })
      setFormData({ subject: '', description: '' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <section className="section">
        <div className="contact-container">
          <h1 className="section-title">Contact Us</h1>

          <div className="contact-grid">
            <div className="contact-info">
              <h3>Get in Touch</h3>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Phone size={24} />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>1-800-ELECTRIC</p>
                  <p className="text-muted">Available 24/7</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Mail size={24} />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>support@electroworks.com</p>
                  <p className="text-muted">Response within 2 hours</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4>Office</h4>
                  <p>123 Power Street</p>
                  <p>Energy City, EC 12345</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Clock size={24} />
                </div>
                <div>
                  <h4>Hours</h4>
                  <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p>Sat - Sun: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h3>Send us a Message</h3>

              {message && (
                <div className={`alert alert-${message.type}`} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {message.text}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your needs..."
                    required
                    className="form-textarea"
                    rows={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.subject || !formData.description}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container text-center">
          <h2>Emergency Service?</h2>
          <p style={{ marginBottom: '2rem' }}>
            For urgent electrical issues, call us immediately at 1-800-ELECTRIC
          </p>
          <button className="btn btn-primary btn-large">Call Emergency Service</button>
        </div>
      </section>
    </div>
  )
}
