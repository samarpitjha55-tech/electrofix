import React from 'react'
import { Zap, Users, Clock, Shield } from 'lucide-react'
import './pages.css'

export default function Home({ setCurrentPage }) {
  const features = [
    {
      icon: <Zap size={32} />,
      title: 'Expert Services',
      description: 'Licensed electricians with 10+ years of experience'
    },
    {
      icon: <Clock size={32} />,
      title: 'Fast Response',
      description: 'Emergency services available 24/7'
    },
    {
      icon: <Shield size={32} />,
      title: 'Quality Guaranteed',
      description: 'All work backed by comprehensive warranty'
    },
    {
      icon: <Users size={32} />,
      title: 'Customer First',
      description: 'Professional and friendly service always'
    },
  ]

  const services = [
    {
      name: 'Residential Installation',
      description: 'Complete electrical installations for homes',
      price: 'From $150'
    },
    {
      name: 'Commercial Maintenance',
      description: 'Regular maintenance for businesses',
      price: 'From $200'
    },
    {
      name: 'Emergency Repairs',
      description: 'Urgent electrical repairs available anytime',
      price: 'From $250'
    },
    {
      name: 'Safety Inspections',
      description: 'Comprehensive electrical safety audits',
      price: 'From $100'
    },
  ]

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Professional Electrical Services</h1>
            <p>Safe, reliable, and expert electrical solutions for your home and business</p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-large" onClick={() => setCurrentPage('booking')}>
                Book Service
              </button>
              <button className="btn btn-outline btn-large" onClick={() => setCurrentPage('services')}>
                View Services
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Electrician" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="grid grid-4">
            {features.map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section section-dark">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="grid grid-2">
            {services.map((service, i) => (
              <div key={i} className="card service-preview">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-price">{service.price}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={() => setCurrentPage('services')}>
              See All Services
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Contact us today for a free quote or emergency service</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-large" onClick={() => setCurrentPage('contact')}>
                Contact Us
              </button>
              <button className="btn btn-outline btn-large" onClick={() => setCurrentPage('booking')}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
