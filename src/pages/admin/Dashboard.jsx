import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ users: 0, total: 0, pending: 0, confirmed: 0 })
  const [upcoming, setUpcoming] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    const users    = JSON.parse(localStorage.getItem('users')    || '[]')
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    setStats({
      users:     users.length,
      total:     bookings.length,
      pending:   bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
    })
    const today = new Date().toISOString().split('T')[0]
    setUpcoming([...bookings].filter(b => b.date >= today && b.status !== 'cancelled').sort((a,b) => a.date.localeCompare(b.date)).slice(0,3))
  }, [])

  // Calendar logic
  const year  = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })
  const today = new Date().getDate()
  const todayMonth = new Date().getMonth()
  const todayYear  = new Date().getFullYear()

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1))

  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
  const bookedDates = bookings.map(b => b.date)

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

  const sidebarItems = [
    { label: 'Dashboard',   path: '/admin',              icon: '🏠' },
    { label: 'Schedule',    path: '/admin/schedule',     icon: '📅' },
    { label: 'Employees',   path: '/admin/dentists',     icon: '👥' },
    { label: 'Appointment', path: '/admin/appointments', icon: '📋' },
    { label: 'Record',      path: '/admin/users',        icon: '📁' },
    { label: 'Setting',     path: '/admin/reports',      icon: '⚙️' },
  ]

  const statusColor = { pending: '#f5c842', confirmed: '#4ecdc4', cancelled: '#ff6b6b' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f0f2f5' }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: 200, background: '#0d1b3e', display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px 24px', borderBottom: '1px solid #243560' }}>
          <div style={{ background: '#4ecdc4', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🦷</div>
        </div>
        <div style={{ padding: '16px 20px 8px' }}>
          <p style={{ fontSize: 10, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1 }}>Dashboard</p>
          <p style={{ fontSize: 11, color: '#4ecdc4' }}>Home / Overview</p>
        </div>
        {sidebarItems.map(item => (
          <div key={item.path} onClick={() => navigate(item.path)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', cursor: 'pointer',
              background: window.location.pathname === item.path ? 'rgba(78,205,196,0.12)' : 'transparent',
              borderLeft: window.location.pathname === item.path ? '3px solid #4ecdc4' : '3px solid transparent',
              color: window.location.pathname === item.path ? '#4ecdc4' : '#8a9fc4',
              fontSize: 13, transition: 'all 0.2s' }}>
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid #243560' }}>
          <button onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }}
            style={{ width: '100%', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', padding: '8px', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Top bar */}
        <div style={{ background: '#fff', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e8e8e8' }}>
          <div>
            <p style={{ fontSize: 11, color: '#8a9fc4' }}>Dashboard</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>Home / Overview</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input placeholder="Search..." style={{ background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 8, padding: '7px 14px', fontSize: 13, outline: 'none', width: 180 }} />
            <div style={{ width: 34, height: 34, background: '#0d1b3e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>👤</div>
            <button onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }}
              style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '7px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              Sign In
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, padding: 24 }}>

          {/* LEFT PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Upcoming Appointments */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0d1b3e' }}>Upcoming Appointments</h2>
                <span onClick={() => navigate('/admin/appointments')} style={{ fontSize: 12, color: '#4ecdc4', cursor: 'pointer' }}>View All →</span>
              </div>
              {upcoming.length === 0 ? (
                <p style={{ color: '#8a9fc4', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>No upcoming appointments</p>
              ) : upcoming.map(b => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid #f0f2f5' }}>
                  <div style={{ width: 38, height: 38, background: '#eef6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>👤</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0d1b3e', marginBottom: 2 }}>{b.userName}</p>
                    <p style={{ fontSize: 12, color: '#8a9fc4' }}>{b.date} · {b.time}</p>
                  </div>
                  <span style={{ fontSize: 12, color: '#666', background: '#f5f6fa', padding: '3px 12px', borderRadius: 99 }}>{b.dentistTitle || 'Check Up'}</span>
                </div>
              ))}
            </div>

            {/* Overview Stats */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0d1b3e', marginBottom: 20 }}>Overview</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { label: 'Total Appointments', num: stats.total,     sub: stats.pending + ' pending' },
                  { label: 'Total Patients',      num: stats.users,     sub: 'registered' },
                  { label: 'Active Doctors',      num: JSON.parse(localStorage.getItem('dentists') || '[]').length, sub: 'on staff' },
                ].map((s, i) => (
                  <div key={i} style={{ background: '#f8f9fc', borderRadius: 12, padding: '18px 16px' }}>
                    <p style={{ fontSize: 12, color: '#8a9fc4', marginBottom: 8 }}>{s.label}</p>
                    <h3 style={{ fontSize: 28, fontWeight: 700, color: '#0d1b3e', marginBottom: 4 }}>{s.num}</h3>
                    <p style={{ fontSize: 11, color: '#4ecdc4' }}>{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Calendar */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#0d1b3e' }}>‹</button>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0d1b3e', fontFamily: 'cursive' }}>{monthName}</p>
                <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#0d1b3e' }}>›</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, textAlign: 'center' }}>
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                  <div key={d} style={{ fontSize: 10, color: '#8a9fc4', fontWeight: 600, padding: '4px 0' }}>{d}</div>
                ))}
                {calendarDays.map((day, i) => {
                  if (!day) return <div key={i}></div>
                  const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
                  const hasBooking = bookedDates.includes(dateStr)
                  const isToday = day === today && month === todayMonth && year === todayYear
                  return (
                    <div key={i} style={{
                      fontSize: 12, padding: '5px 2px', borderRadius: 6, cursor: 'pointer',
                      background: isToday ? '#0d1b3e' : hasBooking ? '#e8f7f6' : 'transparent',
                      color: isToday ? '#fff' : hasBooking ? '#4ecdc4' : '#333',
                      fontWeight: isToday ? 700 : 400,
                    }}>{day}</div>
                  )
                })}
              </div>
            </div>

            {/* Quick Nav */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0d1b3e', marginBottom: 14 }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Manage Appointments', path: '/admin/appointments', color: '#4ecdc4' },
                  { label: 'Manage Dentists',     path: '/admin/dentists',     color: '#7c3aed' },
                  { label: 'View Users',          path: '/admin/users',        color: '#f5c842' },
                  { label: 'Schedule',            path: '/admin/schedule',     color: '#ff6b6b' },
                ].map((q, i) => (
                  <div key={i} onClick={() => navigate(q.path)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: '#f8f9fc', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#eef6ff'}
                    onMouseLeave={e => e.currentTarget.style.background = '#f8f9fc'}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: q.color, flexShrink: 0 }}></div>
                    <span style={{ fontSize: 13, color: '#0d1b3e', fontWeight: 500 }}>{q.label}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 14, color: '#8a9fc4' }}>›</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
