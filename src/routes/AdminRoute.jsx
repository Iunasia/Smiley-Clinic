import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  if (!currentUser) return <Navigate to="/login" replace />
  if (currentUser.role !== 'admin') return <Navigate to="/dashboard" replace />

  return <Outlet />
}