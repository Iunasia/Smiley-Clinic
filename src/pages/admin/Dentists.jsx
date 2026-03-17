import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dentists() {
  const navigate = useNavigate()
  const [dentists, setDentists] = useState([])
  const [form, setForm] = useState({ name: '', title: '', exp: '' })
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dentists') || '[]')
    if (saved.length === 0) {
      const defaults = [
        { id: 1, name: 'Dr. Yoo Rii',   title: 'Orthodontist',     exp: '12+ years specializing in braces and aligner therapy for all ages.' },
        { id: 2, name: 'Dr. Jean Rill',  title: 'General Dentist',  exp: '12+ years specializing in braces and aligner therapy for all ages.' },
        { id: 3, name: 'Dr. Yeon Rill',  title: 'Cosmetic Dentist', exp: '12+ years specializing in braces and aligner therapy for all ages.' },
      ]
      localStorage.setItem('dentists', JSON.stringify(defaults))
      setDentists(defaults)
    } else {
      setDentists(saved)
    }
  }, [])

  const save = () => {
    if (!form.name || !form.title) return
    let updated
    if (editing !== null) {
      updated = dentists.map(d => d.id === editing ? { ...d, ...form } : d)
    } else {
      updated = [...dentists, { id: Date.now(), ...form }]
    }
    localStorage.setItem('dentists', JSON.stringify(updated))
    setDentists(updated)
    setForm({ name: '', title: '', exp: '' })
    setEditing(null)
    setShowForm(false)
  }

  const deleteDentist = (id) => {
    const updated = dentists.filter(d => d.id !== id)
    localStorage.setItem('dentists', JSON.stringify(updated))
    setDentists(updated)
  }

  const startEdit = (d) => {
    setForm({ name: d.name, title: d.title, exp: d.exp })
    setEditing(d.id)
    setShowForm(true)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f0f2f5' }}>

      {/* SIDEBAR */}
      <aside style={{ width: 200, background: '#0d1b3e', display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px 24px', borderBottom: '1px solid #243560' }}>
          <div style={{ background: '#4ecdc4', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🦷</div>
        </div>
        {[
          { label: 'Dashboard',    path: '/admin',               icon: '🏠' },
          { label: 'Schedule',     path: '/admin/schedule',      icon: '📅' },
          { label: 'Employees',    path: '/admin/dentists',      icon: '👥' },
          { label: 'Appointment',  path: '/admin/appointments',  icon: '📋' },
          { label: 'Record',       path: '/admin/users',         icon: '📁' },
          { label: 'Setting',      path: '/admin/reports',       icon: '⚙️' },
        ].map((item) => (
          <div key={item.path} onClick={() => navigate(item.path)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', cursor: 'pointer',
              background: window.location.pathname === item.path ? 'rgba(78,205,196,0.15)' : 'transparent',
              borderLeft: window.location.pathname === item.path ? '3px solid #4ecdc4' : '3px solid transparent',
              color: window.location.pathname === item.path ? '#4ecdc4' : '#8a9fc4', fontSize: 13, transition: 'all 0.2s' }}>
            <span>{item.icon}</span><span>{item.label}</span>
          </div>
        ))}
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 12, color: '#8a9fc4', marginBottom: 2 }}>Dashboard / Employees</p>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0d1b3e' }}>Manage Dentists</h1>
          </div>
          <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', title: '', exp: '' }) }}
            style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            + Add Dentist
          </button>
        </div>

        {showForm && (
          <div style={{ background: '#fff', borderRadius: 14, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e0e0e0' }}>
            <h3 style={{ marginBottom: 16, fontSize: 16, color: '#0d1b3e' }}>{editing !== null ? 'Edit Dentist' : 'Add New Dentist'}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[['name', 'Full Name'], ['title', 'Specialty'], ['exp', 'Experience']].map(([key, placeholder]) => (
                <input key={key} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                  style={{ background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={save} style={{ background: '#4ecdc4', border: 'none', color: '#0d1b3e', padding: '10px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Save</button>
              <button onClick={() => { setShowForm(false); setEditing(null) }} style={{ background: '#f5f6fa', border: '1px solid #e0e0e0', color: '#666', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {dentists.map(d => (
            <div key={d.id} style={{ background: '#1a2d54', borderRadius: 16, padding: '24px 20px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: 'rgba(78,205,196,0.08)', borderRadius: '0 16px 0 100%' }}></div>
              <div style={{ fontSize: 44, marginBottom: 12 }}>👨‍⚕️</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{d.name}</h3>
              <p style={{ fontSize: 12, color: '#4ecdc4', marginBottom: 8 }}>{d.title}</p>
              <p style={{ fontSize: 12, color: '#8a9fc4', lineHeight: 1.6, marginBottom: 16 }}>{d.exp}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => startEdit(d)} style={{ background: 'rgba(78,205,196,0.15)', border: '1px solid #4ecdc4', color: '#4ecdc4', padding: '5px 16px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
                <button onClick={() => deleteDentist(d.id)} style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', padding: '5px 16px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

