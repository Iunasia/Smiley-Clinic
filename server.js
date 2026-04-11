const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// MySQL Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123',
  database: 'patients'
})
// GET all doctors
app.get('/doctors', (req, res) => {
  db.query('SELECT * FROM doctors', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})
const doctor= db.query('SELECT * FROM doctors')
console.log(doctor)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})