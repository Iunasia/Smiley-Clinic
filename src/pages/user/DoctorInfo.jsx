import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DoctorInfo.css'

import doctor1 from '../../assets/images/download (2).png'
import doctor2 from '../../assets/images/download (3).png'
import doctor3 from '../../assets/images/download.png'

const doctors = [
  {
    id: 1,
    name: 'Dr. Jean Rill',
    title: 'Orthodontist',
    exp: '12+ years specializing in braces and aligner therapy for all ages.',
    image: doctor1,
    about: 'Dr. Jean Rill is a highly experienced orthodontist with over 12 years of practice. She is passionate about creating beautiful, healthy smiles for patients of all ages using the latest techniques and technology.',
    education: 'DDS – University of Dental Medicine, 2008',
    specialties: ['Braces', 'Clear Aligners', 'Retainers', 'Jaw Correction'],
    languages: ['English', 'French'],
    schedule: 'Mon – Fri: 9AM – 5PM',
  },
  {
    id: 2,
    name: 'Dr. Yoo Rii',
    title: 'Orthodontist',
    exp: '12+ years specializing in braces and aligner therapy for all ages.',
    image: doctor2,
    about: 'Dr. Yoo Rii brings 12 years of orthodontic expertise and a gentle approach to every patient. She is known for her precision and warm bedside manner.',
    education: 'DDS – Seoul National University, 2009',
    specialties: ['Braces', 'Invisalign', 'Pediatric Ortho', 'Smile Design'],
    languages: ['English', 'Korean'],
    schedule: 'Mon – Sat: 9AM – 6PM',
  },
  {
    id: 3,
    name: 'Dr. Yeon Rill',
    title: 'Orthodontist',
    exp: '12+ years specializing in braces and aligner therapy for all ages.',
    image: doctor3,
    about: 'Dr. Yeon Rill is dedicated to providing comprehensive orthodontic care with a focus on long-term results. Her 12+ years of experience make her one of the most trusted specialists at SMILLY.',
    education: 'DDS – Yonsei University, 2007',
    specialties: ['Lingual Braces', 'Clear Aligners', 'Adult Ortho', 'Retention'],
    languages: ['English', 'Korean', 'Japanese'],
    schedule: 'Tue – Sat: 10AM – 7PM',
  },
]

export default function DoctorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
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
        <img src={doctor.image} alt={doctor.name} className="profile-img" />
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
          <p>{doctor.about}</p>
        </div>

        <div className="detail-card">
          <h3>Education</h3>
          <p>{doctor.education}</p>
        </div>

        <div className="detail-card">
          <h3>Specialties</h3>
          <ul>
            {doctor.specialties.map((s, i) => (
              <li key={i}>🦷 {s}</li>
            ))}
          </ul>
        </div>

        <div className="detail-card">
          <h3>Schedule</h3>
          <p>🕐 {doctor.schedule}</p>
        </div>

      </div>
    </div>
  )
}