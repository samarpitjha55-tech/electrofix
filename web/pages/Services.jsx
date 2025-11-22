import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Zap } from 'lucide-react'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*, service_categories(name)')
          .eq('is_available', true)

        if (error) throw error
        setServices(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="page">
        <div className="container text-center">
          <div className="spinner"></div>
          <p>Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Our Services</h1>
          <p className="text-center" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Professional electrical services tailored to meet all your needs
          </p>

          {error && (
            <div className="alert alert-error">
              Error loading services: {error}
            </div>
          )}

          {services.length === 0 ? (
            <div className="text-center">
              <p>No services available at the moment.</p>
            </div>
          ) : (
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-image">
                    {service.image_url ? (
                      <img src={service.image_url} alt={service.name} />
                    ) : (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: 'white',
                        fontSize: '3rem'
                      }}>
                        <Zap size={64} />
                      </div>
                    )}
                  </div>
                  <div className="service-details">
                    <div className="service-header">
                      {service.service_categories && (
                        <span className="service-category">
                          {service.service_categories.name}
                        </span>
                      )}
                      <h3>{service.name}</h3>
                      <p className="service-description">{service.description}</p>
                    </div>
                    <div className="service-footer">
                      <div className="price-range">
                        ${service.price_min} - ${service.price_max}
                      </div>
                      <span className="text-muted" style={{ fontSize: '0.875rem' }}>
                        ~{service.duration_hours} hours
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container text-center">
          <h2>Need a Custom Quote?</h2>
          <p style={{ marginBottom: '2rem' }}>
            Contact us for services not listed or for detailed pricing information
          </p>
          <button className="btn btn-primary btn-large">Get a Quote</button>
        </div>
      </section>
    </div>
  )
}
