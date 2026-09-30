import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

const COACH = {
  name: 'Shammi Nasrin',
  title: 'Fitness & Beauty Coach',
  tagline: 'Empowering you to feel strong, radiant, and confident — inside and out.',
  avatar: 'https://images.pexels.com/photos/25293894/pexels-photo-25293894.jpeg?auto=compress&cs=tinysrgb&h=600&w=600',
  heroImg: 'https://images.pexels.com/photos/6496085/pexels-photo-6496085.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  stats: [
    { value: '500+', label: 'Clients Coached' },
    { value: '8', label: 'Years Experience' },
    { value: '12', label: 'Certifications' },
    { value: '98%', label: 'Satisfaction' },
  ],
  social: {
    instagram: '@shammi_nasrin',
    email: 'shammi.nasrin@email.com',
  },
}

const SERVICES = [
  {
    id: 'personal-training',
    icon: 'dumbbell',
    title: 'Personal Training',
    desc: '1-on-1 tailored workout programs designed around your body, goals, and schedule. Whether at the gym or home, I build routines that fit your life.',
    img: 'https://images.pexels.com/photos/6392833/pexels-photo-6392833.jpeg?auto=compress&cs=tinysrgb&h=500&w=700',
  },
  {
    id: 'beauty-consultation',
    icon: 'sparkle',
    title: 'Beauty Consultation',
    desc: 'Personalized skincare and beauty guidance. I assess your skin type, goals, and routine to build a regimen that brings out your natural glow.',
    img: 'https://images.pexels.com/photos/8128670/pexels-photo-8128670.jpeg?auto=compress&cs=tinysrgb&h=500&w=700',
  },
  {
    id: 'nutrition-planning',
    icon: 'leaf',
    title: 'Nutrition Planning',
    desc: 'Sustainable, delicious meal plans that fuel your body without restriction. Learn to eat well for energy, muscle, and radiant skin.',
    img: 'https://images.pexels.com/photos/8436641/pexels-photo-8436641.jpeg?auto=compress&cs=tinysrgb&h=500&w=700',
  },
  {
    id: 'group-classes',
    icon: 'users',
    title: 'Group Fitness Classes',
    desc: 'Join energizing small-group sessions that combine strength, cardio, and mobility. Build community while you build your body.',
    img: 'https://images.pexels.com/photos/4853694/pexels-photo-4853694.jpeg?auto=compress&cs=tinysrgb&h=500&w=700',
  },
  {
    id: 'online-coaching',
    icon: 'video',
    title: 'Online Coaching',
    desc: 'Train with me from anywhere. Get personalized programming, weekly check-ins, and video form reviews — all through a simple app.',
    img: 'https://images.pexels.com/photos/4854260/pexels-photo-4854260.jpeg?auto=compress&cs=tinysrgb&h=500&w=700',
  },
  {
    id: 'wellness-retreats',
    icon: 'sun',
    title: 'Wellness Retreats',
    desc: 'Immersive weekend retreats combining fitness, mindfulness, skincare workshops, and nature. Reset your body and mind in beautiful settings.',
    img: 'https://images.pexels.com/photos/13849161/pexels-photo-13849161.jpeg?auto=compress&cs=tinysrgb&h=500&w=700',
  },
]

const TESTIMONIALS = [
  {
    name: 'Aaliyah Khan',
    role: 'Lost 15kg in 6 months',
    text: 'Shammi changed how I see fitness. She made it feel achievable and fun, not like a punishment. I have never felt stronger or more confident.',
    avatar: 'https://images.pexels.com/photos/3762774/pexels-photo-3762774.jpeg?auto=compress&cs=tinysrgb&h=150&w=150',
  },
  {
    name: 'Priya Sharma',
    role: 'Skincare client, 1 year',
    text: 'My skin has never looked better. Shammi built me a simple routine that actually works. I used to spend a fortune on products I did not need.',
    avatar: 'https://images.pexels.com/photos/19274055/pexels-photo-19274055.jpeg?auto=compress&cs=tinysrgb&h=150&w=150',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Online coaching client',
    text: 'Training remotely with Shammi is better than any gym I have joined. The personalized plan fits my schedule and the weekly check-ins keep me accountable.',
    avatar: 'https://images.pexels.com/photos/30797177/pexels-photo-30797177.jpeg?auto=compress&cs=tinysrgb&h=150&w=150',
  },
]

const GALLERY = [
  { img: 'https://images.pexels.com/photos/6455911/pexels-photo-6455911.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', tag: 'Training' },
  { img: 'https://images.pexels.com/photos/8128690/pexels-photo-8128690.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', tag: 'Beauty' },
  { img: 'https://images.pexels.com/photos/8436448/pexels-photo-8436448.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', tag: 'Wellness' },
  { img: 'https://images.pexels.com/photos/4853322/pexels-photo-4853322.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', tag: 'Training' },
  { img: 'https://images.pexels.com/photos/8129916/pexels-photo-8129916.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', tag: 'Beauty' },
  { img: 'https://images.pexels.com/photos/8981374/pexels-photo-8981374.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', tag: 'Wellness' },
]

const SERVICE_OPTIONS = [
  'Personal Training',
  'Beauty Consultation',
  'Nutrition Planning',
  'Group Fitness Classes',
  'Online Coaching',
  'Wellness Retreats',
  'General Inquiry',
]

function Icon({ name, size = 24, className = '' }) {
  const icons = {
    dumbbell: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6.5 6.5L17.5 17.5" /><path d="M21 21l-1-1" /><path d="M3 3l1 1" />
        <path d="M18 22l4-4" /><path d="M2 6l4-4" />
        <path d="M3 10l7-7" /><path d="M14 21l7-7" />
      </svg>
    ),
    sparkle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2l1.5 5L19 8.5 13.5 10 12 15l-1.5-5L5 8.5 10.5 7z" />
        <path d="M19 14l.8 2.7L22 17.5l-2.2.8L19 21l-.8-2.7L16 17.5l2.2-.8z" />
      </svg>
    ),
    leaf: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    video: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    sun: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    arrow: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    quote: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3 21V8.5C3 5.46 5.46 3 8.5 3H10v4H8.5C7.67 7 7 7.67 7 8.5V11h3v10H3zm11 0V8.5C14 5.46 16.46 3 19.5 3H21v4h-1.5c-.83 0-1.5.67-1.5 1.5V11h3v10h-7z" />
      </svg>
    ),
    menu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    close: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  }
  return icons[name] || null
}

function Nav({ onContactClick, mobileOpen, setMobileOpen }) {
  const links = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          <span className="nav-logo-mark">SN</span>
          <span className="nav-logo-text">Shammi Nasrin</span>
        </a>
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
          <button className="nav-cta" onClick={() => { setMobileOpen(false); onContactClick() }}>
            Book a Session
          </button>
        </div>
        <button className="nav-burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
        </button>
      </div>
    </nav>
  )
}

function Hero({ onContactClick }) {
  return (
    <header className="hero" id="top">
      <div className="hero-bg">
        <img src={COACH.heroImg} alt="Training session" />
        <div className="hero-overlay" />
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-eyebrow">Certified Fitness & Beauty Coach</p>
          <h1 className="hero-title">
            Strong body.<br />Radiant skin.<br />Confident you.
          </h1>
          <p className="hero-subtitle">{COACH.tagline}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onContactClick}>
              Book a Free Consultation <Icon name="arrow" size={18} />
            </button>
            <a href="#services" className="btn-ghost">Explore Services</a>
          </div>
        </div>
        <div className="hero-card">
          <img src={COACH.avatar} alt={COACH.name} className="hero-card-avatar" />
          <h3 className="hero-card-name">{COACH.name}</h3>
          <p className="hero-card-title">{COACH.title}</p>
          <div className="hero-card-stats">
            {COACH.stats.map((s) => (
              <div key={s.label} className="hero-card-stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </header>
  )
}

function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img src="https://images.pexels.com/photos/6922159/pexels-photo-6922159.jpeg?auto=compress&cs=tinysrgb&h=700&w=560" alt="Shammi coaching" />
            <div className="about-image-badge">
              <Icon name="check" size={20} />
              <span>Certified Coach</span>
            </div>
          </div>
          <div className="about-content">
            <p className="section-eyebrow">About Me</p>
            <h2 className="section-title">I help you become the best version of yourself</h2>
            <p className="about-text">
              For over eight years, I have dedicated my life to helping people transform — not just
              their bodies, but their relationship with health, beauty, and self-care. My approach
              blends evidence-based fitness training with holistic skincare and wellness guidance.
            </p>
            <p className="about-text">
              I believe that true beauty starts from within. When you feel strong, energized, and
              confident, it shows on the outside. That is why I create programs that address both —
              building physical strength while nurturing radiant, healthy skin.
            </p>
            <div className="about-credentials">
              <div className="credential">
                <Icon name="check" size={18} />
                <span>NASM Certified Personal Trainer</span>
              </div>
              <div className="credential">
                <Icon name="check" size={18} />
                <span>Licensed Esthetician</span>
              </div>
              <div className="credential">
                <Icon name="check" size={18} />
                <span>Precision Nutrition Level 2 Coach</span>
              </div>
              <div className="credential">
                <Icon name="check" size={18} />
                <span>200hr Yoga Alliance Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services({ onContactClick }) {
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">What I Offer</p>
          <h2 className="section-title">Services tailored to your goals</h2>
          <p className="section-subtitle">
            From one-on-one training to personalized skincare routines, every program is built around you.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div key={s.id} className="service-card">
              <div className="service-img-wrap">
                <img src={s.img} alt={s.title} loading="lazy" />
                <div className="service-icon">
                  <Icon name={s.icon} size={24} />
                </div>
              </div>
              <div className="service-body">
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <button className="service-link" onClick={onContactClick}>
                  Learn more <Icon name="arrow" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Training', 'Beauty', 'Wellness']
  const filtered = filter === 'All' ? GALLERY : GALLERY.filter((g) => g.tag === filter)

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Portfolio</p>
          <h2 className="section-title">A glimpse into my world</h2>
        </div>
        <div className="gallery-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`gallery-filter ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {filtered.map((g, i) => (
            <div key={i} className="gallery-item">
              <img src={g.img} alt={g.tag} loading="lazy" />
              <div className="gallery-tag">{g.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Client Stories</p>
          <h2 className="section-title">Real results, real people</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <Icon name="quote" size={32} className="testimonial-quote" />
              <div className="testimonial-stars">
                {[...Array(5)].map((_, j) => (
                  <Icon key={j} name="star" size={16} className="star" />
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: SERVICE_OPTIONS[0], message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }
    setStatus('submitting')
    setError('')
    try {
      const { error: insertError } = await supabase
        .from('inquiries')
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          service: form.service,
          message: form.message.trim(),
        })
      if (insertError) throw insertError
      setStatus('success')
      setForm({ name: '', email: '', service: SERVICE_OPTIONS[0], message: '' })
    } catch (err) {
      setStatus('error')
      setError('Something went wrong. Please try again or email me directly.')
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <p className="section-eyebrow">Get in Touch</p>
            <h2 className="section-title">Let's start your journey</h2>
            <p className="contact-text">
              Book a free 30-minute consultation or ask me anything. I respond to all
              inquiries within 24 hours.
            </p>
            <div className="contact-details">
              <div className="contact-detail">
                <span className="contact-detail-label">Email</span>
                <span className="contact-detail-value">{COACH.social.email}</span>
              </div>
              <div className="contact-detail">
                <span className="contact-detail-label">Instagram</span>
                <span className="contact-detail-value">{COACH.social.instagram}</span>
              </div>
              <div className="contact-detail">
                <span className="contact-detail-label">Location</span>
                <span className="contact-detail-value">Dhaka, Bangladesh — Online worldwide</span>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap">
            {status === 'success' ? (
              <div className="contact-success">
                <div className="success-icon">
                  <Icon name="check" size={40} />
                </div>
                <h3>Message sent!</h3>
                <p>Thank you for reaching out. I will get back to you within 24 hours.</p>
                <button className="btn-secondary" onClick={() => setStatus('idle')}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="service">Service</label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    disabled={status === 'submitting'}
                  >
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your goals..."
                    disabled={status === 'submitting'}
                  />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button
                  type="submit"
                  className="btn-primary form-submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">SN</span>
          <div>
            <p className="footer-name">Shammi Nasrin</p>
            <p className="footer-tagline">Fitness & Beauty Coach</p>
          </div>
        </div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-social">
          <p>{COACH.social.email}</p>
          <p>{COACH.social.instagram}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Shammi Nasrin. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollToContact = () => {
    setMobileOpen(false)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <div className="app">
      <Nav onContactClick={scrollToContact} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Hero onContactClick={scrollToContact} />
      <About />
      <Services onContactClick={scrollToContact} />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
