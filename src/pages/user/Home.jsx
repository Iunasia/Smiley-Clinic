import { useNavigate } from 'react-router-dom'
import './Home.css'
import image from '../../assets/images/download (1).png'
import doctor1 from '../../assets/images/download (2).png'
import doctor2 from '../../assets/images/download (3).png'
import doctor3 from '../../assets/images/download.png'
import mapBg from '../../assets/images/map.jpg'

const specialists = [
  { name: 'Dr. Jean Rill', title: 'Orthodontist', exp: '12+ years specializing in braces and aligner therapy for all ages.', imagee: doctor1 },
  { name: 'Dr. Yoo Rii', title: 'Orthodontist', exp: '12+ years specializing in braces and aligner therapy for all ages.', imagee: doctor2 },
  { name: 'Dr. Yeon Rill', title: 'Orthodontist', exp: '12+ years specializing in braces and aligner therapy for all ages.', imagee: doctor3 },
]

const services = [
  { name: 'Whitening', desc: '12+ years specializing in braces and aligner therapy for all ages.', icon: '🦷' },
  { name: 'Check Up', desc: '12+ years specializing in braces and aligner therapy for all ages.', icon: '🪥' },
  { name: 'X-Ray', desc: '12+ years specializing in braces and aligner therapy for all ages.', icon: '📷' },
  { name: 'Pain Relief', desc: '12+ years specializing in braces and aligner therapy for all ages.', icon: '💊' },
  { name: 'Cleaning', desc: '12+ years specializing in braces and aligner therapy for all ages.', icon: '🧽' },
  { name: 'Surgery', desc: '12+ years specializing in braces and aligner therapy for all ages.', icon: '🔪' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-icon">🦷</span>
          <div style={{ marginLeft: '15px' , fontFamily: 'Playfair Display' }}>SMILLY</div>
        </div>
        <ul className="nav-links">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li><a href="#appointment">Appointment</a></li>
          <li>
            <button className="btn-signin" onClick={() => navigate('/login')}>Sign In</button>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-sub">YOUR PERFECT</p>
          <h1 className="hero-title">
            <span className="highlight">SMILE START</span> HERE
          </h1>
          <p className="hero-desc">
            Comprehensive dental and orthodontic care for the whole family. From routine checkups to advanced cosmetic treatments — we've got your smile covered.
          </p>
          <button className="btn-book" onClick={() => navigate('/book')}>
            <span className="btn-icon">📋</span> Book Appointment
          </button>
        </div>
        <div className="hero-image">
          <div className="hero-img-placeholder" >
            <img src={image} alt="hero" />
            <div className="img-circle"></div>
          </div>
        </div>
      </section>

      {/* SPECIALISTS */}
      <section className="specialists" id="specialists">
        <h2 className="section-title">
          Our <span className="highlight">Specialists</span>
        </h2>
        <p className="section-sub">A dedicated team of caring professionals for treatments you can trust.</p>
        <div className="cards-grid">
          {specialists.map((s, i) => (
            <div className="specialist-card" key={i}>
              <div className="card-avatar">
                  <img src={s.imagee} alt={s.name} className='img' />
              </div>
              <h3 className="card-name">{s.name}</h3>
              <p className="card-title">{s.title}</p>
              <p className="card-desc">{s.exp}</p>
              <button className="btn-view">View</button>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="appointment">
        <h2 className="section-title">
          Our <span className="highlight">Services</span>
        </h2>
        <p className="section-sub">From preventive care to smile transformations, our team of specialists provides expert treatments for every patient.</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-header">
          <h2>Get in <span className="highlight">Touch</span> With Us</h2>
          <p>Have a question, want to book an appointment, or just need some advice? Our friendly team is ready to assist you.</p>
        </div>
        <div className="contact-cards">
          <div className="contact-info-card">
            <span className="contact-icon">📍</span>
            <p className="contact-label">Location</p>
            <p className="contact-val">Smile Clinic - Downtown</p>
          </div>
          <div className="contact-info-card">
            <span className="contact-icon">📞</span>
            <p className="contact-label">Phone Number</p>
            <p className="contact-val">+855 12 345 678</p>
          </div>
          <div className="contact-info-card">
            <span className="contact-icon">✉️</span>
            <p className="contact-label">Email</p>
            <p className="contact-val">smile@dentalcare.com</p>
          </div>
        </div>
        <div 
  className="map-placeholder"
  style={{ 
    backgroundImage: `url(${mapBg})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center 70%'
  }}
>
  <a 
    href="https://maps.app.goo.gl/UgrjtzJ132jWJoNz8" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="map-pin"
  >
     View Location
  </a>
</div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>General Dentistry</li>
              <li>Orthodontics</li>
              <li>Teeth Whitening</li>
              <li>Dental Implants</li>
              <li>Cosmetic Dentistry</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>📍 12 Smile Street</li>
              <li>📞 +1 (555) 234-5678</li>
              <li>✉️ hello@dentalcare.com</li>
              <li>🕐 Mon–Sat 9AM–7PM</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Clinic</h4>
            <ul>
              <li>About Us</li>
              <li>Our Doctors</li>
              <li>Testimonials</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Smile Dental Clinic. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
