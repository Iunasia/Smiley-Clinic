import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)

    // Check localStorage for users
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(
      (u) => u.email === form.email && u.password === form.password
    )

    // Check hardcoded admin
    const isAdmin =
      form.email === 'admin@dental.com' && form.password === 'admin123'

    setTimeout(() => {
      setLoading(false)
      if (isAdmin) {
        const adminUser = { id: 'admin', name: 'Admin', email: form.email, role: 'admin' }
        localStorage.setItem('currentUser', JSON.stringify(adminUser))
        navigate('/admin')
      } else if (found) {
        const loggedIn = { ...found, role: 'user' }
        localStorage.setItem('currentUser', JSON.stringify(loggedIn))
        navigate('/dashboard')
      } else {
        setError('Invalid email or password.')
      }
    }, 800)
  }

  return (
    <div className="login-page">

      {/* NAVBAR */}
      <nav className="login-nav">
        <div className="nav-logo-wrap">
          <span className="logo-icon">🦷</span>
        </div>
        <ul className="login-nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li><a href="#appointment">Appointment</a></li>
          <li className="nav-toggle">
            <span className="toggle-dot on"></span>
            <span className="toggle-dot"></span>
          </li>
          <li>
            <button className="btn-signin active">Sign In</button>
          </li>
        </ul>
      </nav>

      {/* MAIN */}
      <div className="login-main">

        {/* LEFT — illustration */}
        <div className="login-left">
          <div className="illus-wrap">
            <div className="illus-bg-circle large"></div>
            <div className="illus-bg-circle small"></div>
            <div className="illus-chair">
              <div className="chair-body"></div>
              <div className="chair-arm"></div>
              <div className="patient-figure"></div>
              <div className="doctor-figure"></div>
              <div className="lamp"></div>
            </div>
          </div>
        </div>

        {/* RIGHT — login card */}
        <div className="login-right">
          <div className="login-card">

            {/* tooth logo */}
            <div className="card-logo">
              <span className="card-logo-icon">🦷</span>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              {/* Email */}
              <div className="input-group">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="login-input"
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="input-group">
                <span className="input-icon">🔒</span>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="login-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>

              {error && <p className="login-error">{error}</p>}

              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? <span className="spinner"></span> : 'Sign In'}
              </button>

              <div className="divider">
                <span>or Continue With</span>
              </div>

              <button type="button" className="btn-google">
                <span className="google-icon">G</span>
                Login With Google
              </button>
            </form>

            <p className="register-link">
              Don't have an account?{' '}
              <span onClick={() => navigate('/register')}>Register</span>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
