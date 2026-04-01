import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DoctorInfo.css'

import doctor1 from '../../assets/images/download (2).png'
import doctor2 from '../../assets/images/download (3).png'
import doctor3 from '../../assets/images/download.png'

export default function DoctorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  //  Read from localStorage
  const stored = JSON.parse(localStorage.getItem('dentists') || '[]')

  //  Restore default images for the 3 default doctors
  const doctors = stored.map(d => {
    if (d.id === 1 && !d.photo?.startsWith('data:')) return { ...d, photo: doctor1 }
    if (d.id === 2 && !d.photo?.startsWith('data:')) return { ...d, photo: doctor2 }
    if (d.id === 3 && !d.photo?.startsWith('data:')) return { ...d, photo: doctor3 }
    return d
  })

  const doctor = doctors.find((d) => d.id === parseInt(id))

  if (!doctor) return <div className="not-found">Doctor not found.</div>

  return (
    <div className="doctor-detail">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* PROFILE HEADER */}
      <div className="profile-header">
        <img src={doctor.photo} alt={doctor.name} className="profile-img" />
        <div className="profile-info">
          <h1 className="profile-name">{doctor.name}</h1>
          <p className="profile-title">{doctor.title}</p>
          <p className="profile-exp">{doctor.exp}</p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="detail-grid">

        <div className="detail-card">
          <h3>About</h3>
          <p>{doctor.about || 'No information provided.'}</p>
        </div>

        <div className="detail-card">
          <h3>Education</h3>
          <p>{doctor.education || 'No information provided.'}</p>
        </div>

        <div className="detail-card">
          <h3>Specialties</h3>
          {doctor.specialties?.length > 0 ? (
            <ul>
              {doctor.specialties.map((s, i) => (
                <li key={i}>🦷 {s}</li>
              ))}
            </ul>
          ) : (
            <p>No specialties listed.</p>
          )}
        </div>

        <div className="detail-card">
          <h3>Schedule</h3>
          <p>🕐 {doctor.schedule || 'No schedule available.'}</p>
        </div>

      </div>
    </div>
  )
}