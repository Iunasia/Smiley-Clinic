import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Book.css'

const DENTISTS = [
  { id: 1, name: 'Dr. Sarah Mitchell', specialty: 'General Dentistry', avatar: '👩‍⚕️' },
  { id: 2, name: 'Dr. James Tan',      specialty: 'Orthodontics',       avatar: '👨‍⚕️' },
  { id: 3, name: 'Dr. Anika Patel',   specialty: 'Cosmetic Dentistry', avatar: '👩‍⚕️' },
  { id: 4, name: 'Dr. Leo Reyes',     specialty: 'Oral Surgery',       avatar: '👨‍⚕️' },
]

const SERVICES = [
  { id: 1, label: 'General Check-up',    icon: '🔍', duration: '30 min' },
  { id: 2, label: 'Teeth Cleaning',      icon: '🦷', duration: '45 min' },
  { id: 3, label: 'Teeth Whitening',     icon: '✨', duration: '60 min' },
  { id: 4, label: 'Braces Consultation', icon: '📋', duration: '45 min' },
  { id: 5, label: 'Root Canal',          icon: '🩺', duration: '90 min' },
  { id: 6, label: 'Tooth Extraction',    icon: '⚕️',  duration: '60 min' },
]

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
]

const STEPS = ['Dentist', 'Service', 'Date & Time', 'Confirm']

export default function Book() {
  const navigate = useNavigate()
  const [step, setStep]           = useState(0)
  const [dentist, setDentist]     = useState(null)
  const [service, setService]     = useState(null)
  const [date, setDate]           = useState('')
  const [time, setTime]           = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const canNext = [!!dentist, !!service, !!date && !!time, true][step]

  const handleSubmit = () => {
    const appointment = {
      doctorName: dentist.name,
      service: service.label,
      date,
      time,
      status: 'Confirmed',
      id: Date.now(),
    }
    const existing = JSON.parse(localStorage.getItem('bookings') || '[]')
    localStorage.setItem('bookings', JSON.stringify([appointment, ...existing]))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="book-page">
        <div className="book-topbar">
          <div className="book-logo">🦷 SMILLY</div>
        </div>
        <div className="book-content book-success">
          <div className="book-success-icon">🎉</div>
          <h2 className="book-success-title">
            Appointment <span className="teal">Confirmed!</span>
          </h2>
          <p className="book-success-sub">
            Your appointment with {dentist.name} has been booked for {date} at {time}.
          </p>
          <div className="book-btn-row">
            <button className="book-btn-back" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="book-btn-next" onClick={() => navigate('/my-bookings')}>View My Bookings</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="book-page">

      {/* Topbar */}
      <div className="book-topbar">
        <button className="book-back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <div className="book-logo">🦷 SMILLY</div>
      </div>

      <div className="book-content">

        {/* Header */}
        <div className="book-header">
          <h1 className="book-title">Book an <span className="teal">Appointment</span></h1>
          <p className="book-sub">Choose your dentist, service, and preferred time.</p>
        </div>

        {/* Stepper */}
        <div className="book-stepper">
          {STEPS.map((label, i) => (
            <div key={i} className="book-step-item">
              <div className={`book-step-circle ${i < step ? 'done' : i === step ? 'active' : ''}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`book-step-label ${i < step ? 'done' : i === step ? 'active' : ''}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`book-step-line ${i < step ? 'done' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0 — Pick Dentist */}
        {step === 0 && (
          <>
            <p className="book-section-label">Select a Dentist</p>
            <div className="book-dentist-grid">
              {DENTISTS.map((d) => (
                <div
                  key={d.id}
                  className={`book-dentist-card ${dentist?.id === d.id ? 'selected' : ''}`}
                  onClick={() => setDentist(d)}
                >
                  <div className="book-dentist-avatar">{d.avatar}</div>
                  <p className="book-dentist-name">{d.name}</p>
                  <p className="book-dentist-specialty">{d.specialty}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 1 — Pick Service */}
        {step === 1 && (
          <>
            <p className="book-section-label">Select a Service</p>
            <div className="book-service-list">
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  className={`book-service-card ${service?.id === s.id ? 'selected' : ''}`}
                  onClick={() => setService(s)}
                >
                  <div className="book-service-icon">{s.icon}</div>
                  <div>
                    <p className="book-service-name">{s.label}</p>
                    <p className="book-service-duration">⏱ {s.duration}</p>
                  </div>
                  {service?.id === s.id && <span className="book-service-check">✓</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 2 — Pick Date & Time */}
        {step === 2 && (
          <>
            <p className="book-section-label">Select a Date</p>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="book-date-input"
            />
            <p className="book-section-label">Select a Time Slot</p>
            <div className="book-time-grid">
              {TIME_SLOTS.map((t) => (
                <div
                  key={t}
                  className={`book-time-slot ${time === t ? 'selected' : ''}`}
                  onClick={() => setTime(t)}
                >
                  {t}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 3 — Confirm */}
        {step === 3 && (
          <>
            <p className="book-section-label">Review your Appointment</p>
            <div className="book-confirm-card">
              {[
                { label: 'Dentist',   value: `${dentist?.avatar} ${dentist?.name}` },
                { label: 'Specialty', value: dentist?.specialty },
                { label: 'Service',   value: `${service?.icon} ${service?.label}` },
                { label: 'Duration',  value: service?.duration },
                { label: 'Date',      value: date },
                { label: 'Time',      value: time },
              ].map((row, i) => (
                <div key={i} className="book-confirm-row">
                  <span className="book-confirm-label">{row.label}</span>
                  <span className="book-confirm-value">{row.value}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="book-btn-row">
          {step > 0 && (
            <button className="book-btn-back" onClick={() => setStep(step - 1)}>← Back</button>
          )}
          {step < 3 ? (
            <button
              className="book-btn-next"
              disabled={!canNext}
              onClick={() => canNext && setStep(step + 1)}
            >
              Next →
            </button>
          ) : (
            <button className="book-btn-next" onClick={handleSubmit}>
              Confirm Booking ✓
            </button>
          )}
        </div>

      </div>
    </div>
  )
}