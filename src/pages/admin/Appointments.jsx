import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Appointments() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem('bookings') || '[]'))
  }, [])

  const updateStatus = (id, status) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b)
    localStorage.setItem('bookings', JSON.stringify(updated))
    setBookings(updated)
  }

  const filtered = bookings
    .filter(b => filter === 'all' || b.status === filter)
    .filter(b =>
      b.userName?.toLowerCase().includes(search.toLowerCase()) ||
      b.dentistName?.toLowerCase().includes(search.toLowerCase())
    )

  const statusColor = { pending: '#f5c842', confirmed: '#4ecdc4', cancelled: '#ff6b6b' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f0f2f5' }}>

      {/* SIDEBAR */}
      <aside style={{ width: 200, background: '#0d1b3e', display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px 24px', borderBottom: '1px solid #243560' }}>
          <div style={{ background: '#4ecdc4', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🦷</div>
        </div>
        <div style={{ padding: '16px 20px 8px' }}>
          <p style={{ fontSize: 10, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1 }}>Dashboard</p>
          <p style={{ fontSize: 11, color: '#4ecdc4' }}>Home / Overview</p>
        </div>
        {[
          { label: 'Dashboard',   path: '/admin',              icon: '🏠' },
          { label: 'Schedule',    path: '/admin/schedule',     icon: '📅' },
          { label: 'Employees',   path: '/admin/dentists',     icon: '👥' },
          { label: 'Appointment', path: '/admin/appointments', icon: '📋' },
          { label: 'Record',      path: '/admin/users',        icon: '📁' },
          { label: 'Setting',     path: '/admin/reports',      icon: '⚙️' },
        ].map(item => (
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

      {/* MAIN */}
      <div style={{ flex: 1, padding: 32 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 12, color: '#8a9fc4', marginBottom: 2 }}>Dashboard / Appointment</p>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0d1b3e' }}>Manage Appointments</h1>
          </div>
          <button onClick={() => navigate('/admin')}
            style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
            ← Back
          </button>
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search patient or dentist..."
            style={{ flex: 1, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '10px 16px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif", minWidth: 200 }}
          />
          {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ background: filter === f ? '#0d1b3e' : '#fff', border: '1px solid #e0e0e0', color: filter === f ? '#fff' : '#666', padding: '8px 18px', borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'capitalize' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fc' }}>
                {['Patient', 'Dentist', 'Date', 'Time', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#8a9fc4', fontSize: 14 }}>No appointments found</td></tr>
              ) : filtered.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid #f0f2f5' }}>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#0d1b3e', fontWeight: 500 }}>{b.userName}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#666' }}>{b.dentistName}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#666' }}>{b.date}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#666' }}>{b.time}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '4px 12px', borderRadius: 99, border: `1px solid ${statusColor[b.status]}`, color: statusColor[b.status], fontSize: 11, fontWeight: 600, textTransform: 'capitalize' }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {b.status === 'pending' && (
                        <button onClick={() => updateStatus(b.id, 'confirmed')}
                          style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid #4ecdc4', color: '#4ecdc4', padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                          Confirm
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button onClick={() => updateStatus(b.id, 'cancelled')}
                          style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}